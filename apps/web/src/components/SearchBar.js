import {HorizontalLinearLayout} from "../App";
import styled from "styled-components";

export default function SearchBar({style}) {

    const Input = styled.input`
        border: none;
        outline: none;
        background: none;
        width: 100%;
    `;

    return (
        <HorizontalLinearLayout style={style}>
            <i className="fa-solid fa-search"></i>
            <Input placeholder={"Search"}></Input>
        </HorizontalLinearLayout>
    );
}