import { useRouter } from 'next/router'
import FlexRow from '../flex_box/FlexRow'
import Button from '../input/Button'
import { ArrowLeftOutlined, UserOutlined, TeamOutlined, BlockOutlined, UserAddOutlined } from '@ant-design/icons'

const routers = [
    {
        path: '/',
        pathname: `/`,
        name: (isColor) => (
            <div>
                <TeamOutlined
                    style={{
                        color: isColor && '#189A01'
                    }}
                /> Multisigs
            </div>
        )
    },
    {
        path: '/multisig/create',
        pathname: `/multisig/create`,
        name: (isColor) => (
            <div>
                <UserAddOutlined
                    style={{
                        color: isColor && '#189A01'
                    }}
                /> Create Multisig
            </div>
        )
    },
]

const multisigRouters = (multisigID) => {
    return [
        {
            path: `/multisig/${multisigID}`,
            pathname: `/multisig/[multisigID]`,
            name: (isColor) => (
                <div>
                    <UserOutlined
                        style={{
                            color: isColor && '#189A01'
                        }}
                    /> Multisig
                </div>
            )
        },
        {
            path: `/multisig/${multisigID}/all-transactions`,
            pathname: `/multisig/[multisigID]/all-transactions`,
            name: (isColor) => (
                <div>
                    <BlockOutlined
                        style={{
                            color: isColor && '#189A01'
                        }}
                    /> Transactions
                </div>
            )
        },
    ]
}

const transactionRouters = (multisigID, transactionID) => {
    return [
        {
            path: `/multisig/${multisigID}/transaction/${transactionID}`,
            pathname: `/multisig/[multisigID]/transaction/[transactionID]`,
            name: 'Transaction'
        },
    ]
}

const style = {
    button: {
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        fontSize: '1.25rem',
        border: 0,
        paddingTop: '.75em',
        paddingBottom: '.75em',
        width: '100%',
        textAlign: 'right',
    }
}

const SideBar = ({ option }) => {
    const router = useRouter()
    const { multisigID, transactionID } = router.query

    const checkPath = (path) => {
        return router.pathname === path
    }

    return (
        <div
            style={{
                position: 'fixed',
                width: '100%',
                zIndex: 5,
                backgroundColor: '#ffffff',
                padding: '0 30em',
                boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.25)'
            }}
        >
            {
                option === 0 ? (
                    <FlexRow
                        components={[
                            <FlexRow
                                components={[
                                    routers.map((route, index) => {
                                        return (
                                            <Button
                                                type={'link'}
                                                text={route.name(checkPath(route.pathname))}
                                                index={index}
                                                url={route.path}
                                                style={{
                                                    ...style.button,
                                                    color: checkPath(route.pathname) ? '#000000' : '#4b525d',
                                                    fontWeight: checkPath(route.pathname) ? 'bold' : 400
                                                }}
                                                className={'hover-nav-button'}
                                            />
                                        )
                                    })
                                ]}
                                justifyContent={'space-between'}
                                style={{
                                    width: '40%'
                                }}
                            />
                        ]}
                        justifyContent={'end'}
                    />
                ) : option === 1 ? (<FlexRow
                    components={[
                        <Button
                            type={'link'}
                            text={
                                <div>
                                    <ArrowLeftOutlined /> Back
                                </div>
                            }
                            url={'/'}
                            style={{
                                borderRadius: '10px',
                                backgroundColor: '#ffffff',
                                fontSize: '1.25rem',
                                border: 0,
                                paddingTop: '.5em',
                                paddingBottom: '.5em',
                                color: '#4b525d',
                                fontWeight: 400
                            }}
                            className={'hover-nav-button'}
                        />,
                        <FlexRow
                            components={
                                multisigRouters(multisigID).map((route, index) => {
                                    return (
                                        <Button
                                            type={'link'}
                                            text={route.name(checkPath(route.pathname))}
                                            index={index}
                                            url={route.path}
                                            style={{
                                                ...style.button,
                                                color: checkPath(route.pathname) ? '#000000' : '#4b525d',
                                                fontWeight: checkPath(route.pathname) ? 'bold' : 400
                                            }}
                                            className={'hover-nav-button'}
                                        />
                                    )
                                })

                            }
                            justifyContent={'space-between'}
                            style={{
                                width: '40%'
                            }}
                        />
                    ]
                    }
                    justifyContent={'space-between'}
                />) : (
                    <FlexRow
                        components={[
                            <FlexRow
                                components={
                                    multisigRouters(multisigID).map((route, index) => {
                                        return (
                                            <Button
                                                type={'link'}
                                                text={route.name(checkPath(route.pathname))}
                                                index={index}
                                                url={route.path}
                                                style={{
                                                    ...style.button,
                                                    textAlign: 'left',
                                                    color: checkPath(route.pathname) ? '#000000' : '#4b525d',
                                                    fontWeight: checkPath(route.pathname) ? 'bold' : 400
                                                }}
                                                className={'hover-nav-button'}
                                            />
                                        )
                                    })

                                }
                                justifyContent={'space-between'}
                                style={{
                                    width: '40%'
                                }}
                            />
                        ]}
                        justifyContent={'space-between'}
                    />
                )
            }
            <style jsx>{`
                .hover-nav-button:hover {
                    color: black;
                    font-weight: bold;
                }
            `}</style>
        </div>
    )
}

export default SideBar