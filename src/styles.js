export const styles = {
    header: {
        backgroundColor: '#f9f9f9',
        color: '#4c4f56',
        padding: 15,
        margin: 0
    },
    itemOuter: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,
        padding: 0
    },
    itemText: {
        flex: 8,
        padding: '10px 15px'
    },
    itemName: {
        color: '#1589c9',
        textDecoration: 'none'
    },
    itemMsg: {
        color: '#abadb0'
    },
    itemTrashOuter: {
        flex: 1,
        color: '#ddd',
        padding: 15,
        textAlign: 'center',
        ':hover': {
            backgroundColor: '#fd7779',
            color: '#fff'
        }
    }
}
