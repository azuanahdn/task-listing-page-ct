const CustomStyle = {
    noData: {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3f75ff',
          backgroundColor: '#fff !important',
        },
      },
      rows: {
        style: {
          zIndex: 2,
          minHeight: '30px !important', // override the row height
          color: 'rgb(0,0,0, 0.67) !important',
          fontSize: '14px',
          fontWeight: 'bold',
          whiteSpace: 'pre',
          borderBottomColor: 'rgb(63,117,255, 0.6) !important',
          backgroundColor: '#eee !important',
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(220,220,220,0.8) !important',
          },
          '&:not(:last-of-type)': {
            borderBottomStyle: 'solid',
            borderBottomWidth: '2px',
            borderBottomColor: '#343F4B',
          },
        },
      },
      table: {
        style: {
          zIndex: 1,
        },
      },
      headRow: {
        style: {
          backgroundColor: '#eee !important',
          minHeight: '40px',
          borderTopColor: '#fff',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderBottomWidth: '2px',
          borderBottomColor: '#fff',
          borderBottomStyle: 'solid',
          '&:hover': {
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.8) !important',
          },
        },
      },
      headCells: {
        style: {
          color: 'rgb(255,255,255, 0.87) !important',
          fontSize: '16px',
          justifyContent: 'left',
          wordWrap: 'breakWord',
          backgroundColor: '#3f75ff !important',
          '&:hover': {
            cursor: 'pointer',
            color: 'rgba(240,240,240,1) !important',
          },
        },
        activeSortStyle: {
          color: 'rgba(255,255,255, 0.8) !important',
          '&:focus': {
            outline: 'none',
          },
          '&:hover:not(:focus)': {
            color: 'rgba(255,255,255, 1) !important',
          },
        },
        inactiveSortStyle: {
          '&:focus': {
            outline: 'none',
            color: 'rgb(255,255,255, 0.87) !important',
          },
          '&:hover': {
            color: 'rgba(255,255,255,1) !important',
          },
        },
      },
      subHeader: {
        style: {
          backgroundColor: '#242526 !important',
          minHeight: '40px',
          borderBottomColor: '#343F4B',
        },
      },
      pagination: {
        style: {
          color: 'rgb(255,255,255, 0.87) !important',
          minHeight: '40px',
          backgroundColor: '#3f75ff',
          fontSize: '16px',
          borderBottomWidth: '1px',
          borderBottomColor: '#fff',
          borderBottomStyle: 'solid',
          //justifyContent: 'right !important',
          //alignItems: 'center !important',
          //position: 'relative',
        },
        pageButtonsStyle: {
          borderRadius: '50%',
          height: '40px',
          width: '40px',
          padding: '8px',
          margin: 'px',
          cursor: 'pointer',
          transition: '0.4s',
          color: 'rgb(0,0,0, 0.57) !important',
          fill: 'rgb(255,255,255, 0.87) !important',
          backgroundColor: 'transparent',
          '&:disabled': {
            cursor: 'unset',
            color: 'rgb(255,255,255, 0.50) !important',
            fill: 'rgb(255,255,255, 0.50) !important',
          },
          '&:hover:not(:disabled)': {
            backgroundColor: 'rgb(0,0,0,0.40) !important',
          },
          '&:focus': {
            outline: 'none',
            backgroundColor: 'rgb(0,0,0,0.40) !important',
          },
        },
      },
  };
  
  export default CustomStyle;