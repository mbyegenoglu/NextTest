import { Fragment } from "react";
import { useSelector } from 'react-redux';
import { getDictionary } from "../../../redux/slices/dictionarySlice";

export default function ContentComponent({ props, children, data }) {

    let dictionary = useSelector(getDictionary);
    return <div className="px py col-12">
        <div className="container">
            <div className="fl col-12" id="CustomContentPage">
                <h3>{data.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
        </div>
    </div>
}