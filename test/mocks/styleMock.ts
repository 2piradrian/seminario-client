const styleMock: Record<string, string> = new Proxy({}, {
    get: (_target, prop: string) => prop,
})

export default styleMock