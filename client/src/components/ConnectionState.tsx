export function ConnectionState({isConnected}: ConnectionStateType) {
    return <p>State: {" " + isConnected}</p>
}

export interface ConnectionStateType {
    isConnected: boolean
}