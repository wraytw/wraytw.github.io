import React from 'react'
import classNames from 'classnames'
import { Link } from '@reach/router'

import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { NavItem } from '../types'

function styles(theme: Theme) {
  const SIDE_NAV_WIDTH = 250
  const SIDE_NAV_LINK_HEIGHT = 50

  return createStyles({
    sideNav: {
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100%',
      width: SIDE_NAV_WIDTH,
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[10],
      transition: 'all 300ms'
    },
    open: {
      marginLeft: 0
    },
    closed: {
      marginLeft: -SIDE_NAV_WIDTH
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      height: '100%',
      width: '100%',
      position: 'fixed',
      left: 0,
      right: 0,
      visibility: 'hidden',
      opacity: 0,
      transition: 'all 300ms'
    },
    visible: {
      visibility: 'visible',
      opacity: 1
    },
    sideNavLink: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      margin: '10px 10px 10px 0px',
      borderRadius: '0px 50px 50px 0px',
      textAlign: 'center',
      verticalAlign: 'middle',
      lineHeight: `${SIDE_NAV_LINK_HEIGHT}px`,
      display: 'block',
      height: SIDE_NAV_LINK_HEIGHT,
      '&:hover': {
        backgroundColor: theme.palette.grey[300]
      },
      textDecoration: 'none',
      color: theme.palette.common.black
    },
    activeSideNavLink: {
      backgroundColor: fade(
        theme.palette.primary.main,
        theme.palette.action.hoverOpacity * 2
      ),
      color: theme.palette.primary.dark,
      '&:hover': {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity * 2
        ),
        color: theme.palette.primary.dark
      }
    }
  })
}

interface Props {
  classes: {
    sideNav: string
    open: string
    closed: string
    overlay: string
    visible: string
    sideNavLink: string
    activeSideNavLink: string
  }
  items: Array<NavItem>
  open: boolean
  onClose(event: React.MouseEvent): void
}

function SideNav({ classes, items, open, onClose }: Props) {
  return (
    <>
      <div
        onClick={onClose}
        className={`${classes.overlay} ${open && classes.visible}`}
      />
      <div
        className={`${classes.sideNav} ${open ? classes.open : classes.closed}`}
      >
        {items.map(x => (
          <Link
            key={x.label}
            onClick={onClose}
            to={x.to}
            getProps={({ isCurrent }) => {
              return {
                className: classNames(classes.sideNavLink, {
                  [classes.activeSideNavLink]: isCurrent
                })
              }
            }}
          >
            {x.label}
          </Link>
        ))}
      </div>
    </>
  )
}

export default withStyles(styles)(SideNav)
