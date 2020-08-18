export const isLogin = async (to, from, next) => {
    // console.log('to',to)
    // console.log('from',from.location.pathname)
    let isLogin = await localStorage.getItem('isLogin')
    if (isLogin) {
        next();
    } else {
        if(to.location.pathname === '/login' || to.location.pathname === '/register'){
            next()
        } else {
            next.redirect('/login')
            next()
        }
    }
};