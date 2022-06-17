import React from 'react'
import ScrollspyNav from "react-scrollspy-nav";

export default function frequentlyAskedQuestionsComponent() {
  return (
    <div className='px py col-12' id='FaqPage'>
        <div className='row'>
            <div className='container'>

                <div className='px py col-3' id='FaqPageLeft'>
                    <div className='fl col-12 Title'>Merak edilenler</div>
                    <ScrollspyNav 
                        offset={25}
                        scrollTargetIds={ ['ProductInfo', 'OrderPaymentInfo', 'DeliveryCargo', 'CancelReturn', 'Service', 'Account', 'Campaign' ]} 
                        activeNavClass="is-current"  
                        scrollDuration="1000"
                        className='fl col-12'>
                        <li>
                            <a href='#ProductInfo'>Ürün Bilgisi</a>
                            <ul className='fl col-12'>
                                <li><a href='#'>Ürün özellikleri / Fiyat</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href='#OrderPaymentInfo'>Sipariş ve ödeme</a>
                            <ul className='fl col-12'>
                                <li><a href='#'>Sipariş oluşturma</a></li>
                                <li><a href='#'>Ödeme</a></li>
                                <li><a href='#'>Sipariş değişikliği</a></li>
                                <li><a href='#'>Fatura</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href='#DeliveryCargo'>Teslimat ve kargo</a>
                            <ul className='fl col-12'>
                                <li><a href='#'>Kargo takibi</a></li>
                                <li><a href='#'>Eksik / hatalı teslimat</a></li>
                                <li><a href='#'>Teslimat seçenekleri</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href='#CancelReturn'>İptal ve iade</a>
                            <ul className='fl col-12'>
                                <li><a href='#'>İptal ve iade talebi</a></li>
                                <li><a href='#'>İptal ve iade takibi</a></li>
                                <li><a href='#'>Kargo işlemleri</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href='#Service'>Servis ve teknik destek</a>
                            <ul className='fl col-12'>
                                <li><a href='#'>Ürün kurulum</a></li>
                                <li><a href='#'>Garanti belgesi</a></li>
                                <li><a href='#'>Servis / arıza başvurusu</a></li>
                                <li><a href='#'>Servis / arıza takibi</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href='#Account'>Üyelik ve hesap</a>
                            <ul className='fl col-12'>
                                <li><a href='#'>Hesap / giriş işlemleri</a></li>
                                <li><a href='#'>Üyelik iptali</a></li>
                                <li><a href='#'>Ürün yorumlarım</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href='#Campaign'>Kampanya ve hediye çekleri</a>
                            <ul className='fl col-12'>
                                <li><a href='#'>Kampanyalar</a></li>
                                <li><a href='#'>Hediye çekleri</a></li>
                            </ul>
                        </li>
                    </ScrollspyNav>
                </div>

                <div className='px py col-9' id='FaqPageRight'>
                    <div className='fl col-12' id='FaqPageSearch'>
                        <div className='fl col-12 inpıt-group'>
                            <input type={"text"} placeholder="Sıkça Sorulan Sorular içinde ara"></input>
                        </div>
                    </div>

                    <div className='fl col-12' id='FaqPageContent'>
                        <section className='fl col-12' id='ProductInfo'>
                            <h1>ProductInfo</h1>
                        </section>
                        <section className='fl col-12' id='OrderPaymentInfo'>
                            <h1>OrderPaymentInfo</h1>
                        </section>
                        <section className='fl col-12' id='DeliveryCargo'>
                            <h1>DeliveryCargo</h1>
                            </section>
                        <section className='fl col-12' id='CancelReturn'><h1>CancelReturn</h1></section>
                        <section className='fl col-12' id='Service'><h1>Service</h1></section>
                        <section className='fl col-12' id='Account'><h1>Account</h1></section>
                        <section className='fl col-12' id='Campaign'><h1>Campaign</h1></section>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}
