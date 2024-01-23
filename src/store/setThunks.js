/*

  Esta funcion es la que se encarga de setear los thunks en los reducers, es decir, es la que se encarga de setear los estados de loading, error, data, etc.
  también acepta la posibilidad de setear los estados de manera custom, es decir, si se quiere hacer algo diferente a lo que hace el thunk por defecto, se puede hacer.
  al final del archivo hay un ejemplo de un noLoopData.

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

  const value = [...actualData].map(el => {
    if (filterFunc) {
      return filterFunc(data, el)
    }

    if (el[filterBy] === data[filterBy]) {
      return { ...el, ...data }
    }
    return el
  })

  setProperty({ property: 'data', state, value })
}

const deleteHandler = ({ state, data, del, getProperty, setProperty, realDelete }) => {
  const actualData = getProperty({ property: 'data', state })
  const { filterBy, filterFunc } = del

  const value = [...actualData]
    .map(el => {
      if (filterFunc) return filterFunc(data, el)

      if (el[filterBy] === data) return realDelete ? undefined : { ...el, estado: false }
      return el
    })
    .filter(el => el !== undefined)

  setProperty({ property: 'data', state, value })
}

const switchStateHandler = ({ state, data, switch_state, getProperty, setProperty }) => {
  const { filterBy, filterFunc } = switch_state
  const actualData = getProperty({ property: 'data', state })
  const value = [...actualData].map(el => {
    if (filterFunc) return filterFunc(data, el)

    if (el[filterBy] === data[filterBy]) return { ...el, estado: !el.estado }
    return el
  })

  setProperty({ property: 'data', state, value })
}

const thunksSets = ({
  builder,
  placeName,
  hasFiltered,
  name,
  get,
  add,
  update,
  del,
  switch_state,
  realDelete = false
}) => {
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

  const addActionCase = (actionType, dataExtractor, type, preventError = false) => {
    builder.addCase(actionType.fulfilled, (state, action) => {
      const data = dataExtractor(action.payload)

      if (type === 'get') {
        if (get.customFunc) {
          get.customFunc({ state, data, getProperty, setProperty })
        } else {
          setProperty({ property: 'data', state, value: data })
        }
      }
      if (type === 'add') {
        if (add.customFunc) {
          add.customFunc({ state, data, getProperty, setProperty })
        } else {
          addHandler({ state, data, add, getProperty, setProperty })
        }
      }
      if (type === 'switch_state') {
        if (switch_state.customFunc) {
          switch_state.customFunc({ state, data, getProperty, setProperty })
        } else {
          switchStateHandler({ state, data, switch_state, getProperty, setProperty })
        }
      }
      if (type === 'update') {
        if (update.customFunc) {
          update.customFunc({
            update,
            state,
            data,
            placeName,
            name,
            getProperty,
            setProperty
          })
        } else {
          updateHandler({
            update,
            state,
            data,
            placeName,
            name,
            getProperty,
            setProperty
          })
        }
      }
      if (type === 'del') {
        if (del.customFunc) {
          del.customFunc({ state, data, getProperty, setProperty })
        } else
          deleteHandler({
            state,
            data,
            del,
            getProperty,
            setProperty,
            realDelete
          })
      }

      if (hasFiltered) {
        setProperty({
          property: 'filtered',
          state,
          value: getProperty({ property: 'data', state })
        })
      }

      setProperty({ property: 'loading', state, value: false })
      setProperty({ property: 'revalidating', state, value: false })
      setProperty({ property: 'error', state, value: null })
    })
    builder.addCase(actionType.pending, state => {
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

      if (preventError) return
      setProperty({ property: 'error', state, value: data })
    })
  }

  get &&
    addActionCase(
      get.function,
      payload => {
        if (get.dataExtractor) return get.dataExtractor(payload)
        return payload
      },
      'get'
    )
  add &&
    addActionCase(
      add.function,
      payload => {
        if (add.dataExtractor) return add.dataExtractor(payload)
        return payload
      },
      'add',
      add.preventError ?? true
    )
  update &&
    addActionCase(
      update.function,
      payload => {
        // <-- DataExtractor
        if (update.dataExtractor) return update.dataExtractor(payload)
        return payload
      },
      'update'
    )
  del &&
    addActionCase(
      del.function,
      payload => {
        // <-- DataExtractor
        if (del.dataExtractor) return del.dataExtractor(payload)
        return payload
      },
      'del'
    )
  switch_state &&
    addActionCase(
      switch_state.function,
      payload => {
        // <-- DataExtractor
        if (switch_state.dataExtractor) return switch_state.dataExtractor(payload)
        return payload
      },
      'switch_state'
    )
}

export function setThunks({ builder, toLoop, noLoopData, hasFiltered = false, placeName }) {
  noLoopData &&
    (() => {
      const { name, get, add, update, del, switch_state } = noLoopData
      thunksSets({
        builder,
        add,
        get,
        update,
        switch_state,
        del,
        name,
        hasFiltered,
        placeName
      })
    })()
  toLoop &&
    toLoop.forEach(el => {
      const [name, datas] = Object.entries(el)[0]

      const { update, del, get, add, hasFiltered, switch_state } = datas
      thunksSets({
        builder,
        placeName,
        name,
        add,
        del,
        get,
        update,
        switch_state,
        hasFiltered
      })
    })
}
