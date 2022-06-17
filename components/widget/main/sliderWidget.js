import Fragment from 'react';
import { useDispatch } from 'react-redux';
import { setBasket } from '../../../redux/slices/basketSlice';
import Link from 'next/link';
import Image from 'next/dist/client/image';

export default function SliderWidget({ props, children, data }) {
    const dispatch = useDispatch();
    return <Image src={data.src} alt="Görsel" style={{ width: "auto" }} onClick={e => dispatch(setBasket({ id: 7, name: 'halit' }))} height={"100"} width={"100"}></Image>
}