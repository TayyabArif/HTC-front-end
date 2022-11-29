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
                    className={classes.chipText}>{t('company_settings.preferences_card.types.' + id)}<DragHandle visible={visible} /></Typography>}
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

const defWorkTypes = [
  { id: 'maintenance', visible: true },
  { id: 'enhancement', visible: true },
  { id: 'seasonal', visible: true },
  { id: 'complaint', visible: true }
]

export const PreferencesCard = props => {
  const classes = preferencesCardStyles()
  const { t } = useTranslation()

  const [dbWorkTypes, setDbWorkTypes] = useState(defWorkTypes)
  const [columns, setColumns] = useState(dbWorkTypes)

  useEffect(() => {
    setColumns(dbWorkTypes)
  }, [dbWorkTypes])

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
    setDbWorkTypes(columns)
  }

  return (
        <Card className={classes.card} data-testid={'company_access_card'}>
            <CardActions disableSpacing classes={{ root: classes.actions }}>
                <Typography classes={{ root: classes.title }}>
                    {t('company_settings.preferences_card.title')}
                </Typography>
            </CardActions>
            <CardContent classes={{ root: classes.content }}>
                <Typography
                    classes={{ root: classes.subtitle }}>{t('company_settings.preferences_card.work_types')}
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
                <Box display="none !important" className={classes.buttonBox} >

                    <Button onClick={() => { setDbWorkTypes(defWorkTypes) }} size="small" >
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
