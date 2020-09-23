import React from 'react'
import './AdminForm.less';
import {Form, Input, Button} from 'antd';

function AdminForm() {
    return (
        <div className='container'>
            <div className='item relative'>
                <div className='text'>
                    <p className='absolute-title'>ЭС ОГР</p>
                    <p className='subtitle'>ЭКСПЕРТНАЯ СИСТЕМА ОЦЕНКИ РИСКОВ ПРОЯВЛЕНИЯ ОПАСНЫХ ГИДРОГЕОЛОГИЧЕСКИХ ПРОЦЕССОВ И ЯВЛЕНИЙ НА ПЛОЩАДКЕ РАЗМЕЩЕНИЯ АЭС</p>
                </div>
            </div>
            <div className='item'>
                <p className='subtitle'>ВХОД В СИСТЕМУ</p>
                <Form>
                    <Form.Item>
                        <Input
                            className='margin-top-20'
                            style={{ background: 'transparent' }}
                            placeholder='Логин'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            style={{ background: 'transparent' }}
                            placeholder='Пароль'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button className='margin-top-20' type='primary'>ВОЙТИ</Button>
                    </Form.Item>
                </Form>
                <div className='linkContainer'>
                    <a href='#'>Не можете войти?</a>
                </div>
            </div>
        </div>
    )
}

export default AdminForm
