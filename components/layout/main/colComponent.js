
export default function ColComponent({ props, children }) {

    var Key = Math.floor(Math.random() * 100);
    return <div className='fl col-12' key={"Cc"+Key}>
        {children}
    </div>
}