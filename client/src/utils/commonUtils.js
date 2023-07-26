export const mem_logo = 'https://everydayliving.me/wp-content/uploads/2014/12/memorieslogo.jpg';

export const camera_logo = 'https://th.bing.com/th/id/OIP.AUDpYxKwx5r5ha5hnMHpQQAAAA?pid=ImgDet&rs=1'

export const camera = 'https://th.bing.com/th/id/R.fb9a2e03d453c372b03e15f6eea031ad?rik=5%2bCz6rtnZrKCBg&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fyik%2f6KL%2fyik6KLopT.png&ehk=a7sZyqLCrzk6D%2bK48tl9U5Xl9pyuqkY7VqRsO1ABOqc%3d&risl=&pid=ImgRaw&r=0';

export const messageEllipsis = (str) => {
    return (str.length > 100 ? str.substr(0, 100)+"..." : str); 
}

export const titleEllipsis = (str) => {
    return (str.length > 30 ? str.substr(0, 30)+"..." : str); 
}
