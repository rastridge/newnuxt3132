<template>
  <div id="csv">
    <Button
      id="do-cvs"
      class="p-button-sm"
      label="Download CSV file"
      style="margin: 1rem"
      icon="pi pi-download"
      iconPos="left"
      @click="tableToCSV()"
    ></Button>
  </div>
</template>

<script setup>
  const props = defineProps({
    filteredData: { type: Object, required: true },
    filename: { type: String, default: 'accounts.csv' },
  })

  // console.log('props.filteredData = ', props.filteredData)
  // console.log('props.filename = ', props.filename)

  const tableToCSV = async () => {
    function jsonToCsv(data) {
      if (!Array.isArray(data) || data.length === 0) {
        return ''
      }

      const headers = Object.keys(data[0])
      const csvRows = []

      csvRows.push(headers.join(','))

      for (const row of data) {
        const values = headers.map((header) => {
          const value = row[header]
          return `"${value === null || value === undefined ? '' : value}"`
        })
        csvRows.push(values.join(','))
      }
      return csvRows.join('\n')
    }

    function downloadCsv(csvString, filename) {
      const blob = new Blob([csvString], {
        type: 'text/csv;charset=utf-8;',
      })
      const downloadLink = document.createElement('a')
      downloadLink.href = URL.createObjectURL(blob)
      downloadLink.download = filename
      document.body.appendChild(downloadLink)
      downloadLink.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      )
      document.body.removeChild(downloadLink)
    }

    const csvString = jsonToCsv(props.filteredData)
    downloadCsv(csvString, props.filename)
  }
  //
</script>
