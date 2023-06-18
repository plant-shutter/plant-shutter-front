import * as React from 'react'
import './css/VerifyStopRecord.css'



interface ReactSimpleVerifyProps {
    width: number;
    height: number;
    borderColor?: string;
    bgColor: string;
    borderRadius: number;
    tips: string;
    barBackground: string;
    movedColor: string;
    successTips: string;
    successIcon: string;
    success?: () => void;
  }
  
  interface ReactSimpleVerifyState {
    isMouseEnter: boolean;
    diff: number;
  }
  
export default class VerifyStopRecord extends React.Component<ReactSimpleVerifyProps, ReactSimpleVerifyState> {


  /**
   * 默认参数
   */
  static defaultProps = {
    width: 300,
    height: 36,
    borderColor: '#FBDDE0',
    bgColor: '#FBDDE0',
    borderRadius: 4,
    tips: '滑动结束拍摄',
    barBackground: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAdCAYAAADRoo4JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU4NTc5MkIzMjc3RjExRUE5RkNEQUIyQzREODU1NUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU4NTc5MkI0Mjc3RjExRUE5RkNEQUIyQzREODU1NUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTg1NzkyQjEyNzdGMTFFQTlGQ0RBQjJDNEQ4NTU1RUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTg1NzkyQjIyNzdGMTFFQTlGQ0RBQjJDNEQ4NTU1RUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5zUj/hAAAE2klEQVR42sSYTWgbRxTHd7eqIIH00iTuIYTEaqLYhxba4oJdig8toadSqGt6KQQSu1AMCchUB5HGdWM3IWrkQ8ghh1BKPkjjtA4hbQWqaQimHykkjh1kW4mRiypbVrTSaqXV12r7njSrrNb7obUEXfgjSzs785u3/3nzxlRf3wl7oVAYlCRpWdK/ykQiUUmhIlGBKE+UU0ggyhJliHiF0kQcUYooCZorlUpHBgYGnqc5LvvBtm1bblD6l6T61PqtkXtNtxUEYZAul8shmqYdFoCl/2siEOnHNL7vJmCbglQNrdsWAlr722bRCnptrEwWQWkLAanrz2YBZDOvED9oC/1ojin3A1fZKMKWZt6qCJq9GaZJK2xoo/Cl1Ixt9NoyDVohazLzyuzxE7JOpJEIYj7ejP0Ys5nj5jA+7u26c2fmIMAkjCIKyT3odp94h+P47+B7WW/g+fmFT3y+82/BhvWn1qQ1MkitGWM2KzC6bWjoU8+tWz+GL1/+/j2AeqSTliibzXagv//9jpGRsa8jkejnuDtqRdDpdHyxc+f2LR7PV4dhclfI5JTRp3W5VFuv1vZb2Xrz+fzMqVNnO8bGzhxIp9NXcPuFiMvKEQmolZWVz44dc7fPzPxxUBTFGPyWAfFEaRRMPHz37u/vYrtoNOqCdglQiihJxOJbBT2VRZnUCnV1AgwSmpq63TM87HHE4/GTKtgaMCibTCbPY7vr16fegFc/p4Ql4gAoHgotDyJ0MBjsg/7/FcVysioELrMEWgaOU1YLG3gotbj4+NDQ0LBjaenJYS1Yogzs/T+Njp7e53J59mYy2UklbBW4qkQicdrtdrf7/f6efL5wH4HhPkuA5QjHlcCiWXQVVRhKWFtbH8HIBAK/va0BmyU2yBSLxflr1354HaFzudwvMiyJsKwUz/OXvF7v/vHxb14uFsUgwqId1MCM1bxIUhf49J+/8bvD0f6KUZbJ5fJzs7NzyR07ttsZhmnTy9c8n30YjbLF7u43dzMMtVWXy0qNi56FiC2gL9GfLJua0LKCLPD5KEZ2cvLma/DcolZkQevB4NJHR4+694TD4SPwPYJ2IIsNIyxHdx1FNWoFhOX5zE20gcczuk8Qcj8bWQEGH0SIhYVQPxlcDcsVCsVHfv+vPdguFoufJHA1WCNgPVgZWGBZ1oew6EdY9bN6sDBAOBAIdMMi2rO6GnPjIq1faFVY8PPtc+cudCBsOs1fIqCsCvgpAmM2IcAxSgNWHV0B8uQwXI4HD+Y/xMH0sgLcW/X5fE6Xy7WX47iLG7NCFTaV4r6FHbH96tUbr8Lk/5KzghpWXmxKYNwKSyYLTrx37/7Hu3a95Gxra/vSqMRE/01PTx/q7e2dgF3PqVesJxLJM9Ho2mxn534vTTMv0rRx6YrPYmlZ2XkJsGFh04Ljj0Y/NNn6G6qr5VNHpZbQLekaLBVNS0M92E0cxyjGoPyjNlMPW+nHxAqG9XBTJwFrJ4oNVpCMy9v6N8K06iTQhBVMxqx/hIFOn7Tg3KVpBXmh1DeRGrYCzhf7kNtDWltmWJbztODcteGe/L+E6oBK8GeHCjMrIKhyCUBun3gO+op0dXWt2u32Tuj4BcU/LyiLJ2qqgWgrl1xt4clw9U6SKm3wd4jsChwazh4/PnHxPwEGAEcKqqR0b1NgAAAAAElFTkSuQmCC')`,
    movedColor: 'linear-gradient(313deg, rgba(189, 49, 36, 1) 0%, rgba(251, 221, 224, 1) 100%)',
    successTips: '完成拍摄',
    successIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAB1UlEQVQ4T62UMaiPURjGf08ZDHegKMOVlIFiuHGLMlBuUgaDkuEW03UHpQxXmcSNQRkNBooyIpkoREkM1yDEQBluXXUNBoN69Oj8b+f/3e/7X8P/1Dd855x+7/M+7/seMeSlIfMYCLS9CtgJbAB+AV8kfRskohVoew1wHjgBrAN+ANlLgLfAJUkP2sDLgLa3Aw+BP8AF4L6kqMP2VmAKOAXcAaYl5d7S6gPaHgXeAC+BSUm/21TY3lWCJtj0IOC9ktpEM3ITbHs38AI4IOl573xJoe0twGdgTNJcl/GlUAclPbJ9ExiVNNEGPJsiSNqxAuwusBfYDETlY2Btz+da4XVgRNJkKUDMn5P0uvynwj3YfkkfbacDFoBt+c+9GngjbSHpZAFcBM4A+4B3TVi5k1ZarG2qgTPAUUnjvZRtJ8jh0nup7D9l1Xn20hXrJaVX+xTGj1fARknfu9Ks/bV9ORlI2rOsKAUQ4FdJxysV8S7e/mzA0rMfgNOSbnUBk8JT4Iqk2QHVzmynuvN1y/SlXCk6AtwGngHnJL2vzlYDxzLLQGw51FTe9Thknq9lCmJB+QLLftZVYLZtmlZ6vjI9aeJN5fn6BDzpmvHWlLt8+9/9ob/YfwHfuLkV7uJ9fwAAAABJRU5ErkJggg=='
  }

  /**
   * 初始数据
   */
  /** x */
  private x1 = 0
  private x2 = 0
  /** 鼠标是否按下 */
  private isMousedown = false
  /** 是否已经成功 */
  private isSuccess = false
  /** 最大滑动距离 */
  private max = this.props.width - 50
  /** 盒子样式 */
  private style = {
    width: this.props.width,
    height: this.props.height,
    border: `${ this.props.borderColor } 1px solid`,
    backgroundColor: this.props.bgColor,
    borderRadius: this.props.borderRadius
  }
  /** 滑条盒子样式 */
  private slideBoxStyle = {
    borderRadius: this.props.borderRadius
  }
  /** 成功图标 */
  private iconStyle = {
    background: `url(${ this.props.successIcon }) no-repeat`
  }

  constructor(props: ReactSimpleVerifyProps) {
    super(props)
    this.state = {
      /** 是否滑入 */
      isMouseEnter: false,
      /** 滑动距离 */
      diff: 0
    }
  }

  /**
   * 绑定事件
   */
  public componentDidMount() {
    document.body.addEventListener('mousemove', this.mousemove.bind(this))
    document.body.addEventListener('touchmove', this.mousemove.bind(this))
    document.body.addEventListener('mouseup', this.mouseup.bind(this))
    document.body.addEventListener('touchend', this.mouseup.bind(this))
  }

  /**
   * 移除事件
   */
  public componentWillUnmount() {
    document.body.removeEventListener('mousemove', this.mousemove.bind(this))
    document.body.removeEventListener('touchmove', this.mousemove.bind(this))
    document.body.removeEventListener('mouseup', this.mouseup.bind(this))
    document.body.removeEventListener('touchend', this.mouseup.bind(this))
  }

  /**
   * 鼠标移入
   */
  private mouseenter() {
    if (this.isSuccess) {
      return
    }
    this.setState({
      isMouseEnter: true
    })
  }

  /**
   * 鼠标离开
   */
  private mouseleave() {
    if (this.isSuccess || this.isMousedown) {
      return
    }
    this.setState({
      isMouseEnter: false
    })
  }

  /**
   * 鼠标按下
   */
  private mousedown(e: any) {
    if (this.isSuccess) {
      return
    }


    if(this.isMousedown==false){
        this.x1 = e.nativeEvent.x || e.touches[0].clientX
    }

    this.isMousedown = true

  }

  /**
   * 鼠标移动
   */
  private mousemove(e: any) {

    if (!this.isMousedown || this.isSuccess) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    this.x2 = e.x || e.touches[0].clientX
    let diff = this.x2 - this.x1
    if (diff < 0) {
      diff = 0
    }
    if (diff >= this.max) {
      diff = this.max
      this.isSuccess = true
      this.props.success && this.props.success()
    }
    // console.log(this.x2)
    this.setState({
      diff
    })
  }

  /**
   * 鼠标松开
   */
  private mouseup() {
    if (this.isSuccess) {
      return
    }
    this.isMousedown = false
    this.setState({
      isMouseEnter: false,
      diff: 0
    })
  }

  /**
   * 重置
   */
  public reset() {
    this.isSuccess = false
    this.setState({
      diff: 0
    })
    setTimeout(() => {
      this.isMousedown = false
      this.setState({
        isMouseEnter: false
      })
    }, 0)
  }

  public render() {
    /** 滑条样式 */
    const slideStyle = {
      borderRadius: this.props.borderRadius,
      background: this.props.movedColor,
      left: 50 - this.props.width,
      opacity: this.state.isMouseEnter ? 1 : 0,
      transitionDuration: !this.state.isMouseEnter || !this.isMousedown ? '.3s' : '0s',
      transform: `translateX(${ this.state.diff }px)`
    }
    /** 滑块样式 */
    const barStyle = {
      background: this.props.barBackground,
      transitionDuration: !this.state.isMouseEnter || !this.isMousedown ? '.3s' : '0s',
      transform: `translateX(${ this.state.diff }px)`
    }
    /** 成功文本样式 */
    const textStyle = {
      opacity: this.isSuccess ? 1: 0,
      transitionDuration: !this.state.isMouseEnter || !this.isMousedown ? '.3s' : '0s'
    }
    return (
      <div style={ this.style } className="simple-verify">
        <div className="verify-tips">{ this.props.tips }</div>
        <div style={ this.slideBoxStyle } className="verify-box">
          <div style={ slideStyle } className="veriry-slide" />
        </div>
        <div
          className="verify-bar"
          onMouseEnter={ this.mouseenter.bind(this) }
          onTouchStart={ this.mouseenter.bind(this) }
          onMouseLeave={ this.mouseleave.bind(this) }
          onTouchEnd={ this.mouseleave.bind(this) }
          onMouseDown={ this.mousedown.bind(this) }
          onTouchMove={ this.mousedown.bind(this) }
        >
          <div style={ barStyle } className="icon" />
        </div>
        <div style={ textStyle } className="verify-success-tips">
          <span style={ this.iconStyle } />{ this.props.successTips }
        </div>
      </div>
    )
  }
}
