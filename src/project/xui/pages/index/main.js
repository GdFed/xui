import Vue from 'vue'
import App from './index'

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()
/**
ma5:ma(c,5);
ma60:ma(c,60);
xsma5:=ref(ma5,2)<ma5;
lx10xs:=every(xsma5, 10);
hd:=c>o*1.06&&c>ref(c,1)*1.05;
xg:hd&&lx10xs&&c>ma60;
 */
