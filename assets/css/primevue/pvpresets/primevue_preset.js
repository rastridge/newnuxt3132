const pvPreset = {
  dropdown: {
    root: {
      class:
        'shadow-2 md:shadow-4 m-1 p-2 border-1 border-round-lg surface-400',
    },
    input: { class: 'text-lg md:text-xl lg:text-2xl font-semibold' },
    item: { class: 'text-sm md:text-lg  font-semibold' },
  },
  listbox: {
    root: {
      class: 'shadow-4 m-1 p-2 border-1 border-round-lg surface-400',
    },
    item: { class: 'text-sm md:text-lg  font-semibold' },
    input: { class: 'text-sm md:text-lg  font-semibold' },
  },
  dialog: {
    root: {
      style: {
        minWidth: '20rem',
        'border-radius': '20px',
      },
      class: 'w-10',
    },
    header: {
      style: {
        'background-color': '#CCC',
      },
    },
    content: {
      style: {
        padding: '1rem',
        'background-color': '#EEE',
      },
    },
    footer: {
      style: {
        'background-color': '#CCC',
      },
    },
  },
  card: {
    root: {
      style: {
        minWidth: '10rem',
        'background-color': '#CCC',
      },
      class: 'shadow-4 m-1 p-1 border-1 border-round-lg',
    },
    header: {
      style: {
        'background-color': '#CCC',
      },
    },
    title: {
      style: {
        color: '#000',
      },
      class: 'text-black text-lg text-center',
    },
    subtitle: {
      style: {
        color: '#000',
        'background-color': '#DDD',
        padding: '1rem',
      },
    },
    content: {
      style: {
        padding: '1rem',
        'background-color': '#DDD',
        color: '#000',
      },
    },
    footer: {
      style: {
        'background-color': '#CCC',
      },
    },
  },

  menubar: {
    root: {
      style: {
        'background-color': '#transparent',
        'border-radius': '20px',
      },
      class: '',
    },
    menu: {
      style: {
        'background-color': '#transparent',
      },
    },
    submenu: {
      style: {
        'background-color': '#transparent',
      },
    },
    label: {
      class: '',
    },

    content: {
      style: {
        'background-color': '#transparent',
      },
      class: 'ml-2  mb-1 md:mb-2 text-700 text-sm md:text-base lg:text-lg',
    },
  },
}

export default pvPreset
