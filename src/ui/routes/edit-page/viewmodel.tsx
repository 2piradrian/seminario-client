import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageHelper, useRepositories } from "../../../core";
import useSession from "../../hooks/useSession.tsx";
import { Regex, Errors, PageProfile, User, type GetUserByIdReq, PageType, type GetPageByIdReq, type GetPageByIdRes, type EditPageReq, type GetSearchResultFilteredReq, Optionable } from "../../../domain";
import toast from "react-hot-toast";
import { useScrollLoading } from "../../hooks/useScrollLoading.tsx";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { userId, session } = useSession();
    const { userRepository, sessionRepository, catalogRepository, pageRepository, resultRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<PageProfile | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const [pageTypes, setPageTypes] = useState<PageType[] | null>([]);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const { trigger } = useScrollLoading();
    const [canScroll, setCanScroll] = useState<boolean>(true);
    const [searchText, setSearchText] = useState("");
    const [usersPage, setUsersPage] = useState<number>(1);
    const [users, setUsers] = useState<User[] | null>([]);

    {/* ===== Main useEffects ===== */ }

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null) {
                await fetchPageTypes();
                await fetchUser();
                await fetchPage();
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (canScroll && session != null) {
            setUsersPage(trigger);
            fetchUsers().then();
        }
    }, [trigger, searchText]);

    {/* ===== Fetch data ===== */ }

    {/* TODO: Crear ruta dedicada para los usuarios */ }
    const fetchUsers = async () => {
        try {

            const request: GetSearchResultFilteredReq = {
                page: usersPage,
                size: 15,
                text: searchText,
                styles: [],
                instruments: [],
                pageTypeId: "",
                postTypeId: "",
                contentTypeId: "userprofile",
                dateInit: undefined,
                dateEnd: undefined,
                session
            }

            const usersRes = await resultRepository.getSearchResult(request);

            if (!usersRes.users || usersRes.users.length === 0) {
                setCanScroll(false);
                if (usersPage === 1) setSelectedMembers([]);
                return;
            }

            if (usersPage === 1) {
                setUsers(usersRes.users.map(User.fromObject));
            }
            else {
                setUsers(prevUsers => [
                    ...prevUsers,
                    ...usersRes.users.map(User.fromObject)
                ]);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPageTypes = async (): Promise<PageType[]> => {
        try {
            const response = await catalogRepository.getAllPageType();
            const types = response.pageTypes.map((t: any) => PageType.fromObject(t));

            setPageTypes(types);

            return types;
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPage = async () => {
        try {

            const request: GetPageByIdReq = {
                session: session,
                pageId: id
            };

            const response: GetPageByIdRes = await pageRepository.getById(request);

            if (response) {
                const page = PageProfile.fromObject(response);
                setPage(page);
                setSelectedMembers(page.members?.map(m => m.id) ?? []);
            }

        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchUser = async () => {
        try {
            if (!userId) return;
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);

            setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };


    {/* ===== onActions functions ===== */ }


    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                name?: string;
                profileImage?: string;
                portraitImage?: string;
                shortDescription?: string;
                longDescription?: string;
                pageType?: string;
            };

            if (!Regex.NAME.test(form.name || "")) {
                return setError(Errors.INVALID_NAME);
            }

            const profileFile = formData.get("profileImage") as File | null;
            const portraitFile = formData.get("portraitImage") as File | null;

            const profileImageBase64 = profileFile && profileFile.size > 0
                ? await ImageHelper.convertToBase64(profileFile)
                : null;

            const portraitImageBase64 = portraitFile && portraitFile.size > 0
                ? await ImageHelper.convertToBase64(portraitFile)
                : null;

            if (!Regex.SHORT_DESCRIPTION.test(form.shortDescription || "")) {
                return setError(Errors.INVALID_SHORTDESCRIPTION);
            }

            if (!Regex.LONG_DESCRIPTION.test(form.longDescription || "")) {
                return setError(Errors.INVALID_LONGDESCRIPTION);
            }

            const dto: EditPageReq = {
                session: session,
                pageId: id,
                name: form.name!!,
                portraitImage: portraitImageBase64,
                profileImage: profileImageBase64,
                shortDescription: form.shortDescription!!,
                longDescription: form.longDescription!!,
                ownerId: page.owner.id,
                members: selectedMembers,
                pageTypeId: PageType.toOptionable(form.pageType, pageTypes).id
            }

            await pageRepository.edit(dto);

            toast.success("Página editada correctamente");
            navigate(`/page/${id}`);
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);

        }
    }

    const onAddMembers = (value: string) => {
        setSelectedMembers((prev) => (prev.includes(value) ? prev : [...prev, value]));
    };

    const onRemoveMembers = (value: string) => {
        const userInSearch = users?.find(u => u.profile.name === value);
    
        const userInPage = page?.members?.find(m => m.profile.name === value); 

        const idToRemove = userInSearch?.id || userInPage?.id;

        if (idToRemove) {
            setSelectedMembers((prevIds) => prevIds.filter((id) => id !== idToRemove));
        }
    };

    const onCancel = () => {
        navigate(`/page/${id}`);
    }

    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession()

            toast.success("Sesión cerrada")
            navigate("/login", { replace: true })
        }
        catch (e) {
            toast.error("No se pudo cerrar sesión")
        }
    }

    return {
        onSubmit,
        onCancel,
        pageTypes,
        users,
        selectedMembers,
        onAddMembers,
        onRemoveMembers,
        handleSearchChange,
        page,
        user,
        onLogout
    };
}
