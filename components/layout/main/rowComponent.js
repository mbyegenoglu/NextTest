

export default function RowComponent({ props, children }) {
    var Key = Math.floor(Math.random() * 100);
    return <div className='fl col-12' key={"R"+Key}>
        {children}
    </div>
}