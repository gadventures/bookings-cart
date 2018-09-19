export const styles = {
    header: {
        backgroundColor: '#f9f9f9',
        color: '#4c4f56',
        margin: 0,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        textDecoration: 'none',
        lineHeight: '24px'
    },
    itemMsg: {
        color: '#abadb0'
    },
    itemTrashOuter: {
        flex: 1,
        padding: 15,
        textAlign: 'center',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#fd7779'
        }
    },
    itemTrashIcon: {
        fill: '#efefef'
    }
}
