import Image from "next/image";
import React, { Component } from "react";
import Slider from "react-slick";
export default class ProductLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            productImageList : props.images,
            delegate : "[data-fancybox]"
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        return (
            <div className="px py col-6 col-sm-12" id="productLeft">
                
                <div className="px col-2" id="productThumbs">
                    <Slider
                        asNavFor={this.state.nav1}
                        ref={slider => (this.slider2 = slider)}
                        slidesToShow={7}
                        swipeToSlide={true}
                        infinite= {false}
                        focusOnSelect={true}
                        vertical={true}>
                            {this.state.productImageList.map((s, index) => {
                                return  <div className='fl col-12'  key={s}>
                                    <Image
                                        src={"https://cdn.dsmcdn.com//ty30/product/media/images/20210320/16/73984938/155619649/1/1_org.jpg"} 
                                        alt={index} 
                                        height={150} 
                                        width={100}>
                                    </Image>
                                </div>
                            })} 
                        
                        
                    </Slider>
                </div>
                
                <div className="px col-10 col-sm-12" id="productImages">
                        <Slider asNavFor={this.state.nav2}
                            ref={slider => (this.slider1 = slider)}>                   
                                {this.state.productImageList.map((s, index) => {
                                    return  <div className='fl col-12' key={s} data-fancybox="gallery" data-src={'https://cdn.dsmcdn.com/ty134/product/media/images/20210618/14/102146071/188127939/1/1_org_zoom.jpg'}>
                                        <Image
                                            src={"https://cdn.dsmcdn.com/ty134/product/media/images/20210618/14/102146071/188127939/1/1_org_zoom.jpg"} 
                                            alt={index} 
                                            height={750} 
                                            width={500}>
                                        </Image>
                                    </div>
                                })}
                        </Slider>
                </div>

                <div className="px col-10 col-sm-12" id="OtherColorWrap">
                    <Image src={"https://cdn.dsmcdn.com/ty134/product/media/images/20210618/14/102146071/188127939/1/1_org_zoom.jpg"} alt={"OtherColorWrap"} width={500} height={750}></Image>
                </div>
            </div>
        );
    }
}