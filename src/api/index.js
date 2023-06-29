// 整合当前目录下各个页面的所有接口
import { getSms, login } from './login'
import { getUserInfo, getUserChannels, getArticleList, getAllChannels, addUserChannel, deleteUserChannel } from './home'
import { getSuggestion, getResults } from './search'
import { getArticle,following,cancelFollowing,dianzan,cancelDianzan,star,cancelStar,getArticleComments,dianzanCommnets,cancelDianzanCommnets,postComment } from './articles'
import { getUser,editUser,updateAvator} from './user'

// 登录界面涉及的接口
export const getSmsAPI = getSms
export const loginAPI = login

// 首页涉及的接口
export const getUserInfoAPI = getUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticleListAPI = getArticleList
export const getAllChannelsAPI = getAllChannels
export const addUserChannelAPI = addUserChannel
export const deleteUserChannelAPI = deleteUserChannel

// 搜索界面涉及的接口
export const getSuggestionAPI = getSuggestion
export const getResultsAPI = getResults

// 文章详情界面涉及的接口
export const getArticleAPI = getArticle
export const followingAPI = following
export const cancelFollowingAPI = cancelFollowing
export const dianzanAPI = dianzan
export const cancelDianzanAPI = cancelDianzan
export const starAPI = star
export const cancelStaAPI = cancelStar
export const getArticleCommentsAPI = getArticleComments
export const dianzanCommnetsAPI = dianzanCommnets
export const cancelDianzanCommnetsAPI = cancelDianzanCommnets
export const postCommentAPI = postComment

// 用户资料页面涉及的接口
export const getUserAPI = getUser
export const editUserAPI = editUser
export const updateAvatorAPI = updateAvator