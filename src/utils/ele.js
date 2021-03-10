import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';
export default {
    confirm ({title = '提示', message = '你确定要继续执行此操作吗?', type = 'info', callback} = {})
    {
        MessageBox.confirm(message, title, {
            type: type,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            beforeClose: (action, instance, done) => {
                if(action == 'confirm')
                    callback(done)
                else
                {
                    Message.info('您取消了此操作!!!')
                    done()
                }
            }
        })
        .then()
        .catch(() => {})
    }
}