// main components
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// components
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  ListItemIcon,
  Box,
  Chip,
  List,
  Button
} from '@mui/material'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'

// icons
import DragGrid from '../../assets/icons/draggrid.svg'
import DragGridOff from '../../assets/icons/draggridoff.svg'
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material'

// styles
import { preferencesCardStyles } from '../../styles/classes/CompanySettingsClasses'

const DragHandle = SortableHandle(({ visible }) => {
  const classes = preferencesCardStyles()
  return (<ListItemIcon className={classes.listItemIcon}>
        <img src={visible ? DragGrid : DragGridOff} className={classes.gridIcon}></img>
    </ListItemIcon>)
})

const SortableItem = SortableElement(({ items, setColumns, id, visible }) => {
  const { t } = useTranslation()
  const classes = preferencesCardStyles()

  return (
        <Box>
            <Chip className={visible ? classes.chip : classes.chipVisibleOff}
                label={<Typography
                    component={'div'}
                    className={classes.chipText}>{t('company_settings.preferences_card.columns.' + id)}<DragHandle visible={visible} /></Typography>}
                onDelete={() => {
                  const newcolumns = JSON.parse(JSON.stringify(items))
                  const col = newcolumns.find(col => col.id === id)
                  col.visible = !col.visible
                  if (newcolumns.filter(col => col.visible).length >= 1) {
                    setColumns(newcolumns)
                  } else {
                    setColumns(items)
                  }
                }}
                deleteIcon={visible ? <VisibilityIcon className={classes.whiteIcon} /> : <VisibilityOffIcon />}
            ></Chip>
        </Box>)
})

const SortableListContainer = SortableContainer(({ items, setColumns }) => {
  const classes = preferencesCardStyles()
  return (
        <List component="div" className={classes.list}>
            {items?.map((item, index) => (
                <SortableItem items={items} setColumns={setColumns} key={item.id} index={index} {...item} />
            ))}
        </List>)
})

const defWorkColumns = [
  { id: 'location', visible: true },
  { id: 'priority', visible: true },
  { id: 'trade', visible: true },
  { id: 'service', visible: true },
  { id: 'wo_number', visible: true },
  { id: 'tracking', visible: true },
  { id: 'open_date', visible: true },
  { id: 'close_date', visible: true },
  { id: 'wo_status', visible: true }
]

export const PreferencesCard = props => {
  const classes = preferencesCardStyles()
  const { t } = useTranslation()

  const [dbWOrkColumns, setDbWorkColumns] = useState(defWorkColumns)
  const [columns, setColumns] = useState(defWorkColumns)

  useEffect(() => {
    setColumns(defWorkColumns)
  }, [defWorkColumns])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newsort = arrayMove(columns, oldIndex, newIndex)
    setColumns(newsort)
  }

  const arrayMove = (inputarr, oldIndex, newIndex) => {
    const arr = [...inputarr]
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1
      while (k--) {
        arr.push(undefined)
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
    return arr
  }

  const applyChanges = () => {
    console.log(columns)
    setDbWorkColumns(columns)
  }

  return (
        <Card className={classes.card} data-testid='preferences_card' >
            <CardActions disableSpacing classes={{ root: classes.actions }}>
                <Typography classes={{ root: classes.title }}>
                    {t('company_settings.preferences_card.title')}
                </Typography>
            </CardActions>
            <CardContent classes={{ root: classes.content }}>
                <Typography
                    classes={{ root: classes.subtitle }}>{t('company_settings.preferences_card.work_order_columns')}
                </Typography>
                <br />
                <SortableListContainer
                    items={columns}
                    onSortEnd={onSortEnd}
                    useDragHandle={true}
                    axis="xy"
                    setColumns={setColumns}
                />
                <Typography classes={{ root: classes.description }}>{t('company_settings.preferences_card.description')}</Typography>
                <Box className={classes.buttonBox} >

                    <Button onClick={() => { setColumns(dbWOrkColumns) }} size="small" >
                        {t('company_settings.preferences_card.clear')}
                    </Button>

                    <Button onClick={applyChanges} size="small" >
                        {t('company_settings.preferences_card.apply')}
                    </Button>
                </Box>
            </CardContent>
        </Card>
  )
}
