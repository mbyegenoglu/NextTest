

export default function ContainerLayout({ props, children }) {
    var Key = Math.floor(Math.random() * 100);
    return <div {...props} key={"C"+Key}>
        {children}
    </div >
}


