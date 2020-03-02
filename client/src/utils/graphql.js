import gql from 'graphql-tag'

export const IS_LOGIN = gql`
    {
        isLogin
    }
`

export const ME = gql`
    {
        me{
            firstName
            lastName
        }
    }
`

export const SIGN_UP = gql`
    mutation signup($input: RegisterInput!) {
        signup(input: $input)
    }
`

export const LOGIN = gql`
    mutation login($login: String!, $pwd: String!){
        login(login: $login, pwd: $pwd)
    }
`

export const LOGOUT = gql`
    mutation logout{
        logout
    }
`

export const ALL_PRODUCTS = gql`
    {
        allProducts{
            id
            name
            price
            type
            stock
            enabled
            url
        }
    }
`

export const REMOVE_PRODUCT = gql`
    mutation removeProduct($id: ID!){
        removeProduct(id: $id){
            id
        }
    }
`

export const MODIFY_PRODUCT = gql`
    mutation modifyProduct($id: ID!, $input: ProductInput!){
        modifyProduct(id: $id, input: $input){
            id
            name
            price
            type
            stock
            enabled
            url
        }
    }
`

export const ADD_PRODUCT = gql`
    mutation addProduct($input: ProductInput!){
        addProduct(input: $input){
            id
            name
            price
            type
            stock
            enabled
            url
        }
    }
`
