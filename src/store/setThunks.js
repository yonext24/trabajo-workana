/*

  Esta funcion es la que se encarga de setear los thunks en los reducers, es decir, es la que se encarga de setear los estados de loading, error, data, etc.
  también acepta la posibilidad de setear los estados de manera custom, es decir, si se quiere hacer algo diferente a lo que hace el thunk por defecto, se puede hacer.
  al final del archivo hay un ejemplo de un noLoopData con un custom.

*/

const addHandler = ({ state, getProperty, setProperty, data }) => {
  const actualData = getProperty({ property: 'data', state })
  const value = [...actualData]
  value.push(data)
  setProperty({ property: 'data', state, value })
}

const updateHandler = ({ update, state, data, placeName, name, getProperty, setProperty }) => {
  const { filterBy, filterFunc } = update
  const actualData = getProperty({ property: 'data', state, placeName, name })
  console.log(data)

  const value = [...actualData].map(el => {
    if (filterFunc) {
      return filterFunc(data, el)
    }

    if (el[filterBy] === data[filterBy]) return data.newData
    return el
  })

  setProperty({ property: 'data', state, value })
}

const deleteHandler = ({ state, data, del, getProperty, setProperty }) => {
  const actualData = getProperty({ property: 'data', state })
  const { filterBy, filterFunc } = del

  const value = [...actualData].map(el => {
    if (filterFunc) return filterFunc(data, el)

    if (el[filterBy] === data) return undefined
    return el
  }).filter(el => el !== undefined)

  setProperty({ property: 'data', state, value })
}

const thunksSets = ({ builder, placeName, hasFiltered, name, get, add, update, del, customs = [] }) => {
  const getProperty = ({ property, state }) => {
    return placeName ? state[placeName][name][property] : state[name][property]
  }

  const setProperty = ({ property, state, value }) => {
    if (placeName) {
      state[placeName][name][property] = value
    } else {
      state[name][property] = value
    }
  }
  // Se necesita hacer el getProperty para obtener los datos del estado actual
  // ya que se necesita hacer un selector dinámico dependiendo de si existe [placeName] o no
  // la misma lógica aplica a setProperty

  // [placeName] se utiliza cuando el slice contiene sub-slices, por ejemplo:
  // oferta_academica -> carrera -> nivel <== Este es un sub-slice
  // oferta_academica -> extension <== Este no contiene sub-slices
  // Y property corresponde al estado que se quiere setear, por ejemplo: data, loading, error, filtered etc.

  const addActionCase = (actionType, dataExtractor, type, customFunc) => {
    builder.addCase(actionType.fulfilled, (state, action) => {
      const data = dataExtractor(action.payload)

      if (type === 'get') {
        setProperty({ property: 'data', state, value: data })
      }
      if (type === 'add') {
        addHandler({ state, data, add, getProperty, setProperty })
      }
      if (type === 'update') {
        updateHandler({ update, state, data, placeName, name, getProperty, setProperty })
      }
      if (type === 'del') {
        deleteHandler({ state, data, del, getProperty, setProperty })
      }

      if (type === 'custom') {
        const actualData = getProperty({ property: 'data', state }).map(el => el)
        customFunc({ actualData, setProperty, payload: data })
      }

      if (hasFiltered) {
        setProperty({ property: 'filtered', state, value: getProperty({ property: 'data', state }) })
      }

      setProperty({ property: 'loading', state, value: false })
      setProperty({ property: 'revalidating', state, value: false })
      setProperty({ property: 'error', state, value: null })
    })
    builder.addCase(actionType.pending, (state, action) => {
      setProperty({ property: 'revalidating', state, value: true })
      setProperty({ property: 'error', state, value: null })

      if (type === 'get') {
        // Si la data ya existe, simplemente se revalida, pero no se agrega el estado de loading
        const data = getProperty({ property: 'data', state })
        if (data?.length !== 0 && data !== undefined) return

        setProperty({ property: 'loading', state, value: true })
      }
    })
    builder.addCase(actionType.rejected, (state, action) => {
      const data = action.error.message

      setProperty({ property: 'loading', state, value: false })
      setProperty({ property: 'revalidating', state, value: false })
      setProperty({ property: 'error', state, value: data })
    })
  }

  addActionCase(get.function, payload => payload, 'get')
  addActionCase(add.function, payload => payload, 'add')
  addActionCase(update.function, payload => payload, 'update')
  addActionCase(del.function, payload => payload, 'del')
  customs.length >= 1 && customs.forEach(custom => {
    addActionCase(custom.function, payload => payload, 'custom', custom.fulfilled)
    // ^^^^ Esta es la manera de setear un custom
    // custom.function corresponde al thunk, payload => payload es el dataExtractor (deprecated (xD))
    // 'custom' es el type y custom.fulfilled es la función que se ejecuta cuando el thunk se resuelve
  })
}

// dataExtractor no sirve de nada, fue una idea del principio pero al final no la utilicé

export function setThunks ({ builder, toLoop, noLoopData, hasFiltered = false, placeName }) {
  noLoopData && (() => {
    const { name, get, add, update, del, customs } = noLoopData
    thunksSets({ builder, add, get, update, del, name, customs, hasFiltered, placeName })
  })()
  toLoop && toLoop.forEach(el => {
    const [name, datas] = Object.entries(el)[0]
    const { update, del, get, add, hasFiltered, customs } = datas
    thunksSets({ builder, placeName, name, add, del, get, customs, update, hasFiltered })
  })
}

/*
{
  unidad: {
    get: {
      function: get_unidad_academica_unidad
    },
    add: {
      function: add_unidad_academica_unidad
    },
    update: {
      function: update_unidad_academica_unidad,
      filterBy: 'nombre'
    },
    del: {
      function: delete_unidad_academica_unidad,
      filterBy: 'nombre'
    },
    hasFiltered: true
  }
}
*/
