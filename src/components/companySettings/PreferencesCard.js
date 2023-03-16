/** main components **/
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

/** components **/
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

/** icons **/
import DragGrid from '../../assets/icons/draggrid.svg'
import DragGridOff from '../../assets/icons/draggridoff.svg'
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material'

/**  styles **/
import { preferencesCardStyles } from '../../styles/classes/CompanySettingsClasses'

/** services **/
import { putCompanyConfigs } from '../../services/ApiService'

/** Constants **/
import { defWorkColumns } from '../../lib/Constants'

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

export const PreferencesCard = props => {
  const { companyConfigs, getCompanyInfo } = props
  const classes = preferencesCardStyles()
  const { t } = useTranslation()
  const userStore = useSelector(state => state.auth.user)
  const [columns, setColumns] = useState([])
  const [disableSave, setDisable] = useState(false)

  useEffect(() => {
    setColumns(getColumnsConfig())
  }, [companyConfigs])

  const getColumnsConfig = () => {
    if (companyConfigs && companyConfigs?.length > 0) {
      const columnsConfig = companyConfigs.find(config => config.type === 'columns')
      if (columnsConfig) {
        return columnsConfig.data
      } else {
        return defWorkColumns
      }
    } else {
      return defWorkColumns
    }
  }

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

  const applyChanges = async () => {
    setDisable(true)
    const actualConfigs = companyConfigs ?? []
    const newConfigs = []
    actualConfigs.forEach(config => {
      if (config.type !== 'columns') {
        newConfigs.push(config)
      }
    })
    newConfigs.push({
      type: 'columns',
      data: columns
    })
    await putCompanyConfigs(userStore.userInfo.company_id, newConfigs)
    await getCompanyInfo()
    setDisable(false)
  }

  const objectsEqual = (o1, o2) =>
    typeof o1 === 'object' && Object.keys(o1).length > 0
      ? Object.keys(o1).length === Object.keys(o2).length &&
            Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
      : o1 === o2

  const handleDisable = () => {
    let disable = true
    const actualConfig = getColumnsConfig()
    if (actualConfig.length > 0 && columns.length > 0) {
      actualConfig.forEach((element, index) => {
        if (!objectsEqual(element, columns[index])) {
          disable = false
        }
      })
    }
    setDisable(disable)
  }

  useEffect(() => {
    handleDisable()
  }, [companyConfigs, columns])

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
                <Box className={classes.buttonBox}>
                  {!disableSave
                    ? <Button onClick={async () => await applyChanges()} size="small" className={classes.applyButton} >
                    {t('company_settings.preferences_card.apply')}
                  </Button>
                    : <br/>}
                </Box>
            </CardContent>
        </Card>
  )
}
