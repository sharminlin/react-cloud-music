import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { getRankList } from './store/action'
import Loading from '../../baseUI/Loading'
import Scroll from '../../baseUI/Scroll'
import { EnterLoading } from '../Singers/style'
import {
  List,
  ListItem,
  SongList,
  Container
} from './style';
import { filterIndex } from '../../api/util'

function Rank (props) {
  const { rankList, loading, songsCount } = props
  const { getRankListDataDispatch } = props

  useEffect(() => {
    if (!rankList.length) {
      getRankListDataDispatch()
    }
    // eslint-disable-next-line
  }, [])

  let globalStartIndex = filterIndex(rankList)
  let officialList = rankList.slice(0, globalStartIndex)
  let globalList = rankList.slice(globalStartIndex)

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`)
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index+1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
       {
        list.map((item) => {
          return (
            <ListItem key={item.id} tracks={item.tracks} onClick={() => enterDetail(item)}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt=""/>
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              { renderSongList(item.tracks)  }
            </ListItem>
          )
       })
      }
      </List>
    )
  }

  const displayStyle = { display: loading ? 'none' : '' }
  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          { renderRankList(officialList) }
          <h1 className="global" style={displayStyle}>全球榜</h1>
          { renderRankList(globalList, true) }
          { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
        </div>
      </Scroll>
      { renderRoutes(props.route.routes) }
    </Container>
  )
}

const mapStateToProps = (state) => ({
  rankList: state.rank.rankList,
  loading: state.rank.loading,
  songsCount: state.player.playList.length
})

const mapDispatchToProps = (dispatch) => ({
  getRankListDataDispatch () {
    dispatch(getRankList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
