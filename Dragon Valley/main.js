//轮播
{
  const $imgCt = $('.img-ct')
  const $imgs = $('.slides .img-ct li')
  const $imgNavis = $('.slide-navi>span')

  let pageIndex = 0
  let isAnimate = false

  const imgCount = $imgs.length
  const imgWidth = $imgs.width()

//克隆首尾的图片dom
  $imgCt.append($imgs.first().clone())
  $imgCt.prepend($imgs.last().clone())

//计算容器的宽度
  $imgCt.width((imgCount + 2) * imgWidth)

//向左偏移一格 让用户看到第一张图片
  $imgCt.css({left: -imgWidth})


//定位到被点的那一个
  $imgNavis.click(function () {
    let index = $(this).index()

    if (index > pageIndex) {
      playNext(index - pageIndex)
    } else if (index < pageIndex) {
      plaPre(pageIndex - index)
    }
  })


//定义上一页下一页
  function playNext(len) {
    if (isAnimate) return
    isAnimate = true
    $imgCt.animate({
      left: '-=' + len * imgWidth
    }, function () {
      pageIndex += len
      if (pageIndex === imgCount) {
        pageIndex = 0
        $imgCt.css({left: -imgWidth})
      }
      setBullet()
      isAnimate = false
    })
  }

  function plaPre(len) {
    if (isAnimate) return
    isAnimate = true
    $imgCt.animate({
      left: '+=' + len * imgWidth
    }, function () {
      pageIndex -= len
      if (pageIndex < 0) {
        pageIndex = imgCount - 1
        $imgCt.css({left: -imgCount * imgWidth})
      }
      setBullet()
      isAnimate = false
    })
  }

  function setBullet() {
    $imgNavis.removeClass('active').eq(pageIndex).addClass('active')
  }

  setInterval(function () {
    playNext(1)
  }, 4000)
}

//新闻
{
  let $tabs = $('.grid-top .tab>li')
  const $tabLine = $('.grid-top #tab-line')
  const $newList = $('.new-list #dmNews-list')

  let tabIndex = 0
  let tabWidth = 71
  let newWidth = -322


  //定位到被点的那一个


  $tabs.click(function () {
    let index = $(this).index()
    tabClassAdd(index)


    if (index === 0) {
      $tabLine.animate({left: tabIndex + 10})
      $newList.animate({marginLeft: tabIndex})
    } else if (index === 1) {
      $tabLine.animate({left: tabIndex + 10 + tabWidth})
      $newList.animate({marginLeft: newWidth})
    } else if (index === 2) {
      $tabLine.animate({left: tabIndex + 10 + (tabWidth * 2)})
      $newList.animate({marginLeft: newWidth * 2})
    } else if (index === 3) {
      $tabLine.animate({left: tabIndex + 10 + (tabWidth * 3)})
      $newList.animate({marginLeft: newWidth * 3})
    }

  })

  function tabClassAdd(index) {
    $tabs.removeClass('active').eq(index).addClass('active')
  }


}

{
  const $next = $('.grid-top .navi .n')
  const $pre = $('.grid-top .navi .p')
  const $imgsCt = $('#lab-list')
  const $imgs = $('#lab-list li')

  let imgsWidth = $imgs.width()
  let clickCount = 0

  $next.click(function () {
    if (clickCount >= 3)return
    playNext()
  })

  $pre.click(function () {
    if (clickCount <= 0)return
    plaPre()
  })


  function playNext() {
    $imgsCt.animate({
      marginLeft: '-=' + (imgsWidth * 4 + 8)
    })
    clickCount++
  }

  function plaPre() {
    $imgsCt.animate({
      marginLeft: '+=' + (imgsWidth * 4 + 8)
    })
    clickCount--
  }

}