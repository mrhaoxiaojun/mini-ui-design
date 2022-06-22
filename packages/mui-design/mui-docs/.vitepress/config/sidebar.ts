    // 根据脚本自动生成sidebar
    export default {
      '/': [
	  {
	    "text": "介绍",
	    "link": "/"
	  },
	  {
	    "text": "快速开始",
	    "link": "/start"
	  },
	  {
	    "text": "通用",
	    "children": [
	      {
	        "text": "Button 测试按钮",
	        "link": "/components/button/"
	      }
	    ]
	  },
	  {
	    "text": "反馈",
	    "children": [
	      {
	        "text": "Modal 对话框",
	        "link": "/components/modal/"
	      }
	    ]
	  }
	]
    }
  