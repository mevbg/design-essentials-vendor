export default {
  dimensions: {
    $type: 'dimensions',
    
    thumbnail: {
      height: { $value: '180px' }
    },
    checkInput: {
      size: { $value: '16px' }
    },
    siteLogo: {
      width: { $value: { min: '50px', max: '70px' } }
    },
    toggle: {
      thumb: { $value: '0.8333333333em' }
    },
    profilePhoto: {
      l: { $value: { min: '160px', max: '160px' } },
      m: { $value: { min: '120px', max: '120px' } },
      s: { $value: { min:  '36px', max: '36px' } }
    }
  }
};
