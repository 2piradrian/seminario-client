import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { Errors, Instrument, PageProfile, Post, Style, type GetAllInstrumentRes, type GetAllStyleRes, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes, type UserProfile } from "../../../domain";
import toast from "react-hot-toast";
import type { GetAllContentTypeRes } from "../../../domain/dto/catalog/response/GetAllContentTypeRes";
import { ContentType } from "../../../domain/entity/content-type";

export default function ViewModel() {
    const navigate = useNavigate();
    
    const { session } = useSession();
    const { catalogRepository , resultRepository} = useRepositories();

    const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
    const [styles, setStyles] = useState<Style[]>([]);
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [pages, setPages] = useState<PageProfile[]>([]);

    const [styleNames, setStyleNames] = useState<string[]>([]);
    const [instrumentNames, setInstrumentNames] = useState<string[]>([]);
    const [contentTypeNames, setContentTypeNames] = useState<string[]>([]);
    const showExtraFilters = selectedType === 'Usuarios' || selectedType === 'Páginas';

    useEffect(() => {
        const searchData = async () => {

            if (!selectedType || selectedType === "Seleccionar") {
                setPosts([]);
                setProfiles([]);
                setPages([]);
                return;
            }

            try {
                const contentTypeObject = contentTypes.find(ct => ct.name === selectedType);
                const pageTypeId = contentTypeObject ? contentTypeObject.id : null;
                if (!pageTypeId) return;

                const styleObject = styles.find(s => s.name === selectedStyle);
                const stylesParam = styleObject ? [styleObject] : [];

                const instrumentObject = instruments.find(i => i.name === selectedInstrument);
                const instrumentsParam = instrumentObject ? [instrumentObject] : [];

                const requestDto: GetSearchResultFilteredReq = {
                    page: 1, 
                    size: 15,
                    name: searchText || '',
                    styles: stylesParam,
                    instruments: instrumentsParam,
                    ids: [], 
                    pageTypeId: pageTypeId,
                };
                const response: GetSearchResultFilteredRes = await resultRepository.getFiltered(requestDto);
                setPosts(response.posts ? response.posts.map(Post.fromObject) : []);
                setProfiles(response.userProfiles || []);
                setPages(response.pagesProfiles || []);
            } catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
        };
        searchData();
    }, [selectedType, selectedStyle, selectedInstrument, searchText, session]);

    useEffect(() => {
        const fetchCatalog = async () => {
                try {
                    const stylesResponse: GetAllStyleRes = await catalogRepository.getAllStyle();
                    const instrumentsResponse: GetAllInstrumentRes = await catalogRepository.getAllInstrument();
                    const contentTypeResponse: GetAllContentTypeRes = await catalogRepository.getAllContentType();

                    if (stylesResponse) {
                        setStyles([...stylesResponse.styles]);
                        setStyleNames(stylesResponse.styles.map(s=> s.name));
                    }
                    if (instrumentsResponse) {
                        setInstruments([...instrumentsResponse.instruments]);
                        setInstrumentNames(instrumentsResponse.instruments.map(i=> i.name));
                    }
                    if (contentTypeResponse) {
                        setContentTypes([...contentTypeResponse.contentTypes]);
                        setContentTypeNames(contentTypeResponse.contentTypes.map(ct=> ct.name));
                    }   
                }
                catch (error) {
                    toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
                }
            };

            if(session) {
                fetchCatalog();
            }
    }, [session]);
        
    const handleTypeChange = (value: string) => {
            setSelectedType(value);
            setSelectedStyle(null);
            setSelectedInstrument(null);
        };

    const handleStyleChange = (value: string) => {
        setSelectedStyle(value === "Seleccionar" ? null : value);
    };

    const handleInstrumentChange = (value: string) => {
        setSelectedInstrument(value === "Seleccionar" ? null : value);
    };

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };
         
    const goToEditProfile = () => {
        navigate("/profile/edit");
    };

    return {
        styles: styleNames,
        instruments: instrumentNames,
        contentTypes: contentTypeNames,
        handleTypeChange,
        handleStyleChange,
        handleInstrumentChange,

        selectedStyle,
        selectedType,
        selectedInstrument,

        posts,
        profiles,
        pages,

        showExtraFilters,
        handleSearchChange,
        searchText
    };
}
