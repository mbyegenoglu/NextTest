import React from 'react'
import Slider from "react-slick";
import Link from 'next/link';
import Image from 'next/dist/client/image';

export default function homeComponent() {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll:1
    };

    const miniSet = settings;

  return (
    <div className='fl col-12 homePage'>
        <div className="fl col-12" id="MainPageCarousel">
            <Slider {...settings} className="fl col-12" id="">
                <Link href="/kadin-abiye">
                    <a className="fl col-12">
                        <Image height={700} width={1920} src={"https://img1ptrti.mncdn.com/content/images/thumbs/6281f4398c7bf2bcec829ad0.png"} alt="Kadın Abiye"></Image>
                    </a>
                </Link>
                <Link href="/buyuk-beden-abiye">
                    <a className="fl col-12">
                        <Image height={700} width={1920} src={"https://img1ptrti.mncdn.com/content/images/thumbs/6281e8e38c7bf2bcec1223a3.png"} alt="Kadın Abiye"></Image>
                    </a>
                </Link>
            </Slider>
        </div>
        <div className="px py col-12" id="BannerList">
            <div className="container-fluid">
                <div className="row">
                    <div className="px py col-6 col-sm-12">
                        <Link href="/kadin-abiye">
                            <a className="fl col-12">
                                <Image height={500} width={940} src={"https://img1ptrti.mncdn.com/content/images/thumbs/6281e6cc8c7bf2bcecda9219.png"} alt="Kadın Abiye"></Image>
                            </a>
                        </Link>
                    </div>
                    <div className="px py col-6 col-sm-12">
                        <Link href="/buyuk-beden-abiye">
                            <a className="fl col-12">
                                <Image height={500} width={940} src={"https://img1ptrti.mncdn.com/content/images/thumbs/6281e6db9015d5d5e179bdd5.png"} alt="Kadın Abiye"></Image>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
