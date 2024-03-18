import React from 'react';
import PlayMarket from '../../assets/icon/PlayMarket';
import AppleStore from '../../assets/icon/AppleStore';
import FooterLogo from '../../assets/icon/FooterLogo';

const Footer = () => {
  return (
    <div className='bg-primary'>
    <div className='container'>
      <div className='footer_block flex justify-between pt-8 pb-6'>
        <div className='footer_logo'>
          <FooterLogo/>
        </div>
        <div className='footer_link_1'>
          <ul className='flex flex-col gap-2'>
            <li className='text-white'>Mobil ilovalar</li>
            <li className='text-white'>Yordam</li>
            <li className='text-white'>Pullik xizmatlar</li>
            <li className='text-white'>OXO da biznes</li>
            <li className='text-white'>Saytda reklama</li>
            <li className='text-white'>Foydalanish shartlari</li>
            <li className='text-white'>Maxfiylik siyosati</li>
            <li className='text-white'>Foydalanish shartlari</li>
          </ul>
        </div>
        <div className='footer_link_2'>
          <ul className='flex flex-col gap-2'>
            <li className='text-white'>Qanday qilib sotish va sotib olish kerak?</li>
            <li className='text-white'>Xavfsizlik qoidalari</li>
            <li className='text-white'>Sayt xaritasi</li>
            <li className='text-white'>Mintaqalar xaritasi</li>
            <li className='text-white'>OXO da karyera</li>
            <li className='text-white'>Qayta aloqa</li>
          </ul>
        </div>
        <div className='footer_apps'>
          <AppleStore/>
          <PlayMarket/>
        </div>
      </div>
      <div className='footer_copywrite'>
        <p className='text-white text-center py-8 border-t-2 border-thirdary border-opacity-[0.4]'>© 2022 Barcha huquqlar himoyalangan.Ushbu sayt cookie-fayllardan foydalanadi. Brauzeringizda cookie sozlamalarini o'zgartirishingiz mumkin.</p>
      </div>
    </div> 
    </div>
  )
}

export default Footer; 