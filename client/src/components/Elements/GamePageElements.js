import styled from 'styled-components';

export const SubHeading = styled.div`
    padding: 30px 0px;
    text-align: center;
    font-weight: bold;
`

export const SupplyChain = styled.div`
    padding-top: 15px;
    font-weight: bold;
`

export const Status = styled.span`
    font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
    color: ${({ordered}) => (ordered ? '#00FF00' : '#FF0000')};
`
export const Data = styled.span`
    font-weight: bold;
    color: ${({blue}) => (blue ? '#0000FF' : '#000')};
`

export const Item = styled.div`
    padding-top: 5px;
    text-indent: ${({indent}) => (indent) ? '15px' : '0px'};
`

export const Info = styled.div`
    padding-top: 10px;
    text-align: center;
`

export const FormInput = styled.input`
    margin-left: 15px;
    margin-top: 30px;
    border-radius: 4px;
`

export const FormButton = styled.button`
    background: #808080;
    padding: 5px 5px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: inline;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #1E90FF;
    }
`