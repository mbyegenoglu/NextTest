import React from 'react'

export default function SocialInner() {
    return (
        <div className='fl col-12 SocialLogin'>
            <h4 className='fl col-12'>Sosyal hesap ile giriş yap</h4>
            <p className='fl col-12'>{"Patırtı'ya şifresiz giriş yapabilmek için Google, Apple veya Facebook hesabınızı bağlayabilirsiniz."}</p>
            <ul className='fl col-12'>
                <li>
                    <a href='#'>
                        <div className='Img'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25"><g fill="none"><path fill="#4285F4" d="M23.989 12.511c0-1.006-.082-1.74-.259-2.502H12.24v4.542h6.744c-.136 1.129-.87 2.828-2.502 3.97l-.023.153 3.633 2.814.252.026c2.312-2.136 3.645-5.277 3.645-9.003"></path><path fill="#34A853" d="M12.24 24.478c3.304 0 6.078-1.088 8.104-2.964l-3.862-2.992c-1.034.72-2.42 1.224-4.243 1.224-3.236 0-5.983-2.135-6.963-5.086l-.143.012-3.778 2.924-.05.137c2.013 3.998 6.147 6.745 10.934 6.745"></path><path fill="#FBBC05" d="M5.276 14.66c-.258-.762-.408-1.578-.408-2.42 0-.844.15-1.66.395-2.422l-.007-.162-3.825-2.97-.126.059C.476 8.405 0 10.267 0 12.239s.476 3.835 1.305 5.494l3.971-3.073"></path><path fill="#EB4335" d="M12.24 4.732c2.297 0 3.847.993 4.731 1.823l3.455-3.373C18.304 1.21 15.544 0 12.239 0 7.452 0 3.32 2.747 1.305 6.745l3.958 3.073c.993-2.95 3.74-5.086 6.976-5.086"></path></g></svg></div>

                        <span>Google ile Giriş yap</span>
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <div className='Img'><svg xmlns="http://www.w3.org/2000/svg" width="23" height="28" viewBox="0 0 23 28"><path d="M19.041 14.876c.04 4.237 3.717 5.647 3.758 5.665-.031.1-.588 2.01-1.938 3.982-1.167 1.706-2.378 3.405-4.286 3.44-1.875.035-2.478-1.111-4.621-1.111-2.143 0-2.813 1.076-4.588 1.146-1.841.07-3.244-1.844-4.42-3.544C.54 20.978-1.296 14.631 1.17 10.347c1.226-2.128 3.416-3.475 5.794-3.51 1.808-.034 3.515 1.217 4.62 1.217 1.106 0 3.18-1.505 5.36-1.284.914.038 3.476.37 5.122 2.778-.133.082-3.058 1.785-3.026 5.328M15.517 4.47c.978-1.184 1.636-2.832 1.457-4.471-1.41.057-3.114.94-4.125 2.122-.906 1.048-1.7 2.724-1.485 4.331 1.57.122 3.176-.798 4.153-1.982"></path></svg></div>
                        <span>Apple ile Giriş yap</span>
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <div className='Img'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"></svg></div>
                        <span>Facebook ile Giriş yap</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}
