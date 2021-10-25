class index {

  /**
   * @name 车险保单表格数据
   * @returns
   */
  getCarInsuranceTabList () {
    return [
      {name: "序号", width: "50px", solt: false, fixed: false, model: "number"},
      {name: "保险公司", width: "190px", solt: false, fixed: false, model: "productCompany"},
      {name: "保单号", width: "200px", solt: false, fixed: false, model: "policyNo"},
      {name: "险种名称", width: "200px", solt: false, fixed: false, model: "riskName"},
      {name: "车牌号", width: "100px", solt: false, fixed: false, model: "carNum"},
      {name: "车架号", width: "150px", solt: false, fixed: false, model: "frameNo"},
      {name: "投保人", width: "150px", solt: false, fixed: false, model: "insuredPersonName"},
      {name: "被保人", width: "150px", solt: false, fixed: false, model: "insuredName"},
      {name: "起保日期", width: "90px", solt: true, fixed: false, model: "assureStartDate"},
      {name: "终保日期", width: "90px", solt: true, fixed: false, model: "assureEndDate"},
      {name: "保额", width: "80px", solt: false, fixed: false, model: "totalAmount"},
      {name: "签单日期", width: "90px", solt: true, fixed: false, model: "underwriteEndDate"},
      {name: "签单保费", width: "90px", solt: false, fixed: false, model: "totalPremium"},
      {name: "保费收入", width: "90px", solt: false, fixed: false, model: "incomeMoney"},
      {name: "经纪费率", width: "90px", solt: false, fixed: false, model: "disRate"},
      {name: "操作", width: "150px", solt: true, fixed: 'right', model: "operation"}
    ]
  }

  /**
   * @name 雇主责任险表格数据
   * @returns
   */
  getEmployerTableList () {
    return {
      1: [
        {name: "序号", width: "50px", solt: false, fixed: false, model: "number"},
        {name: "保险公司", width: "190px", solt: false, fixed: false, model: "productCompany"},
        {name: "保单号", width: "200px", solt: false, fixed: false, model: "policyNo"},
        {name: "险种名称", width: "120px", solt: false, fixed: false, model: "insuranceName"},
        {name: "投保人", width: "150px", solt: false, fixed: false, model: "insuredPersonName"},
        {name: "被保人", width: "150px", solt: false, fixed: false, model: "insuredName"},
        {name: "起保日期", width: "90px", solt: true, fixed: false, model: "assureStartDate"},
        {name: "终保日期", width: "90px", solt: true, fixed: false, model: "assureEndDate"},
        {name: "保额", width: "90px", solt: false, fixed: false, model: "totalAmount"},
        {name: "签单日期", width: "90px", solt: true, fixed: false, model: "underwriteEndDate"},
        {name: "签单保费", width: "90px", solt: false, fixed: false, model: "totalPremium"},
        {name: "保费收入", width: "90px", solt: false, fixed: false, model: "incomeMoney"},
        {name: "经纪费率", width: "90px", solt: false, fixed: false, model: "disRate"},
        {name: "保单状态", width: "", solt: true, fixed: false, model: "policyStatus"},
        {name: "操作", width: "150px", solt: true, fixed: 'right', model: "operation"}
      ],
      2: [
        {name: "序号", width: "50px", solt: false, fixed: false, model: "number"},
        {name: "保险公司", width: "190px", solt: false, fixed: false, model: "productCompany"},
        {name: "投保单号", width: "200px", solt: false, fixed: false, model: "appliedNo"},
        {name: "险种名称", width: "120px", solt: false, fixed: false, model: "insuranceName"},
        {name: "投保人", width: "", solt: false, fixed: false, model: "insuredPersonName"},
        {name: "被保人", width: "", solt: false, fixed: false, model: "insuredName"},
        {name: "起保日期", width: "90px", solt: true, fixed: false, model: "assureStartDate"},
        {name: "终保日期", width: "90px", solt: true, fixed: false, model: "assureEndDate"},
        {name: "保额", width: "90px", solt: false, fixed: false, model: "totalAmount"},
        {name: "保费", width: "90px", solt: false, fixed: false, model: "totalPremium"},
        {name: "操作", width: "80px", solt: true, fixed: 'right', model: "operation"}
      ],
      3: [
        {name: "序号", width: "50px", solt: false, fixed: false, model: "number"},
        {name: "保险公司", width: "", solt: false, fixed: false, model: "productCompany"},
        {name: "险种名称", width: "", solt: false, fixed: false, model: "insuranceName"},
        {name: "投保人", width: "", solt: false, fixed: false, model: "insuredPersonName"},
        {name: "被保人", width: "", solt: false, fixed: false, model: "insuredName"},
        {name: "起保日期", width: "", solt: true, fixed: false, model: "assureStartDate"},
        {name: "终保日期", width: "", solt: true, fixed: false, model: "assureEndDate"},
        {name: "保费", width: "90px", solt: false, fixed: false, model: "totalPremium"},
        {name: "操作", width: "150px", solt: true, fixed: 'right', model: "operation"}
      ]
    }
  }

  /**
   * @name 车险理赔表格信息
   * @returns
   */
  getCarInsuranceCompensateTabList () {
    return [
      {name: "序号", width: "71px", solt: false, fixed: false, model: "number"},
      {name: "保险公司", width: "200px", solt: false, fixed: false, model: "productCompany"},
      {name: "险种名称", width: "200px", solt: false, fixed: false, model: "riskName"},
      {name: "保单号", width: "200px", solt: false, fixed: false, model: "policyNo"},
      {name: "报案号", width: "200px", solt: false, fixed: false, model: "registNo"},
      {name: "事故号", width: "200px", solt: false, fixed: false, model: "accidentNo"},
      {name: "报案日期", width: "90px", solt: true, fixed: false, model: "reportDate"},
      {name: "出险日期", width: "90px", solt: true, fixed: false, model: "damageDate"},
      {name: "车牌号", width: "100px", solt: false, fixed: false, model: "carNum"},
      {name: "车架号", width: "200px", solt: false, fixed: false, model: "frameNo"},
      {name: "投保人", width: "150px", solt: false, fixed: false, model: "insuredPersonName"},
      {name: "被保人", width: "150px", solt: false, fixed: false, model: "insuredName"},
      {name: "报案人", width: "150px", solt: false, fixed: false, model: "reportorName"},
      {name: "报案人电话", width: "115px", solt: false, fixed: false, model: "reportormobile"},
      {name: "操作", width: "90px", solt: true, fixed: 'right', model: "operation"}
    ]
  }
  /**
   * @name 雇主责任险理赔表格信息
   * @returns
   */
  getEmployerCompensateTableList () {
    return [
      {name: "序号", width: "71px", solt: false, fixed: false, model: "number"},
      {name: "保险公司", width: "200px", solt: false, fixed: false, model: "productCompany"},
      {name: "险种名称", width: "200px", solt: false, fixed: false, model: "insuranceName"},
      {name: "保单号", width: "200px", solt: false, fixed: false, model: "policyNo"},
      {name: "报案号", width: "200px", solt: false, fixed: false, model: "registNo"},
      {name: "报案日期", width: "90px", solt: true, fixed: false, model: "reportDate"},
      {name: "出险日期", width: "90px", solt: true, fixed: false, model: "damageDate"},
      {name: "投保人", width: "150px", solt: false, fixed: false, model: "insuredPersonName"},
      {name: "被保人", width: "150px", solt: false, fixed: false, model: "insuredName"},
      {name: "报案人", width: "150px", solt: false, fixed: false, model: "reportorName"},
      {name: "报案人电话", width: "115px", solt: false, fixed: false, model: "reportorPhoneNumber"},
      {name: "操作", width: "90px", solt: true, fixed: 'right', model: "operation"}
    ]
  }
  /**
   * @name 车险保单详情表格数据
   * @returns
   */
  getCarInsuranceDetailsTableList () {
    return [
      { type: 'Single', column: 2, name: '',
      children: [{ name: '投保人', key: 'carPolicyDTO', model: 'insuredPersonName' }, { name: '被保人', key: 'carPolicyDTO', model: 'insuredName' }] },
      { type: 'multiline', column: 1, name: '被保险机动车信息', column2: 2, 
      children: [
        { name: '车牌号码', key: 'carCitemcarDTO', model: 'carNum' }, { name: '厂牌型号', key: 'carCitemcarDTO', model: 'modelCode' }, 
        { name: '发动机号', key: 'carCitemcarDTO', model: 'engineNo' }, { name: '识别代码(车架号)', key: 'carCitemcarDTO', model: 'frameNo' },
        { name: '核定载客', key: 'carCitemcarDTO', model: 'seatCount' }, { name: '核定载质量', key: 'carCitemcarDTO', model: 'tonCount', unit: '吨' },
        { name: '新车购置价', key: 'carCitemcarDTO', model: 'purchasePrice', unit: '元' }, { name: '初登日期', key: 'carCitemcarDTO', model: 'enrollDate', type: 'time', enCode: 'date' }
      ] },
      { type: 'multiline', column: 1, name: '责任限额', column2: 2,
      children: [
        { name: '车损保费', key: 'carCitemkindDTO', model: 'apremium', unit: '元' }, { name: '车损保额', key: 'carCitemkindDTO', model: 'aamount', unit: '元' },
        { name: '三者保费', key: 'carCitemkindDTO', model: 'bpremium', unit: '元' }, { name: '三者保额', key: 'carCitemkindDTO', model: 'bamount', unit: '元' }
      ] },
      { type: 'Single', column: 1, name: '',
      children: [{ name: '保险费合计(人民币大写)', model: '', textAlign: 'centent', type: 'money' }] },
      { type: 'Single', column: 2, name: '',
      children: [{ name: '车损保额', key: 'carCitemkindDTO', model: 'aamount', unit: '元' }, { name: '车损保费', key: 'carCitemkindDTO', model: 'apremium', unit: '元' }] },
      { type: 'Single', column: 2, name: '',
      children: [{ name: '三者保额', key: 'carCitemkindDTO', model: 'bamount', unit: '元' }, { name: '三者保费', key: 'carCitemkindDTO', model: 'bpremium', unit: '元' }] },
      { type: 'Single', column: 1, name: '',
       children: [{ name: '签单日期', model: '', textAlign: 'centent', type: 'date', enCode: 'time' }] },
    ]
    // return [
    //   { 
    //     name: '基本信息',
    //     model: 'carPolicyDTO',
    //     children: [
    //       [ 
    //         { name: '保单号', model: 'policyNo' },
    //       ],
    //       [ 
    //         { name: '投保人', model: 'insuredPersonName' },
    //         { name: '被保人', model: 'insuredName' },
    //       ],
    //       [ 
    //         { name: '起保日期', type: 'date', model: 'assureEndDate' },
    //         { name: '终保日期', type: 'date', model: 'assureStartDate' },
    //       ],
    //       [ 
    //         { name: '保费收入', model: 'incomeMoney' },
    //         { name: '保额', model: 'totalAmount' },
    //       ],
    //       [ 
    //         { name: '险种代码', model: 'riskCode' },
    //         { name: '险种名称', model: 'riskName' },
    //       ],
    //     ]
    //   },
    //   {
    //     name: '车辆信息',
    //     model: 'carCitemcarDTO',
    //     children: [
    //       [ 
    //         { name: '保单号', model: 'policyNo' },
    //         { name: '车牌号', model: 'carNum' }
    //       ],
    //       [ 
    //         { name: '车型名称', model: 'modelName' },
    //         { name: '车型代码', model: 'modelCode' },
    //         { name: '新车购置价', model: 'purchasePrice' },
    //       ],
    //       [ 
    //         { name: '车架号', model: 'frameNo' },
    //         { name: '发动机号', model: 'engineNo' },
    //         { name: '使用年限', model: 'useYears' },
    //       ],
    //       [ 
    //         { name: '座位数', model: 'seatCount' },
    //         { name: '初登日期', type: 'date', model: 'enrollDate' },
    //         { name: '核定载质量', model: 'tonCount' },
    //       ],
    //     ]
    //   },
    //   {
    //     name: '险别信息',
    //     model: 'carCitemkindDTO',
    //     type: 'select',
    //     children: {
    //       business: [
    //         [
    //           { name: '车损保费', model: 'apremium' },
    //           { name: '车损保额', model: 'aamount' }
    //         ],
    //         [
    //           { name: '三者保费', model: 'bpremium' },
    //           { name: '三者保额', model: 'bamount' }
    //         ],
    //         [
    //           { name: '车上人员(司机)保费', model: 'd11Premium' },
    //           { name: '车上人员(司机)保额', model: 'd11Amount' }
    //         ],
    //         [
    //           { name: '车上人员(乘客)保费', model: 'd12Premium' },
    //           { name: '车上人员(乘客)保额', model: 'd12Amount' }
    //         ],
    //         [
    //           { name: '盗抢保费', model: 'gpremium' },
    //           { name: '盗抢保额', model: 'gamount' }
    //         ],
    //         [
    //           { name: '新增设备保费', model: 'xpremium' },
    //           { name: '新增设备保额', model: 'xamount' }
    //         ],
    //         [
    //           { name: '车身划痕损失险保费', model: 'lpremium' },
    //           { name: '车身划痕损失险保额', model: 'laMount' }
    //         ],
    //         [
    //           { name: '精神损害慰问金责任险保费', model: 'rpremium' },
    //           { name: '精神损害慰问金责任险保额', model: 'ramount' }
    //         ],
    //         [
    //           { name: '假日限额翻倍险保费', model: 'jiariPremium' },
    //           { name: '假日限额翻倍险保额', model: 'jiariAmount' }
    //         ],
    //         [
    //           { name: '自燃保费', model: 'zpremium' },
    //           { name: '自燃保额', model: 'zaMount' }
    //         ],
    //         [
    //           { name: '涉水保费', model: 'x1Premium' },
    //           { name: '涉水保额', model: 'x1Amount' }
    //         ],
    //         [
    //           { name: '机动车损失险无法找到第三方特约险保费', model: 'null1Premium' },
    //           { name: '机动车损失险无法找到第三方特约险保额', model: 'null1Amount' }
    //         ]
    //       ],
    //       Jiaoqiang: [
    //         [
    //           { name: '死亡伤残赔偿限额', model: '180000元' },
    //           { name: '无责任死亡伤残赔偿限额', model: '18000元' }
    //         ],
    //         [ 
    //           { name: '医疗费用赔偿限额', model: '18000元' },
    //           { name: '无责任医疗费用赔偿限额', model: '1800元' },
    //         ],
    //         [
    //           { name: '财产损失赔偿限额', model: '2000元' },
    //           { name: '无责任财产损失赔偿限额', model: '100元' },
    //         ]
    //       ]
    //     }
    //   }
    // ]
  }
  /**
   * @name 车险保单报案报案信息录入数据
   * @returns 
   */
  getCarInsuranceReportInput () {
    return [
      [
        { name: '保单号', type: 'input', key: 'policyNo', disabled: true, model: '' },
        { name: '车牌号', type: 'input', key: 'licenseNo', disabled: true, model: '' },
        { name: '车架号', type: 'input', key: 'frameNo', disabled: true, model: '' }
      ],
      [
        { name: '报案日期', type: 'date', key: 'reportDate', model: '' },
        { name: '报案人姓名', type: 'input', key: 'reportorName', model: '' },
        { name: '报案人手机号', type: 'number', key: 'reportorMobile', model: '' }
      ],
      [
        { name: '出险日期', type: 'date', key: 'damageStartDate', model: '' },
        { name: '出险原因', type: 'input', key: 'damagereasonDesc', model: '' }
      ],
      [
        { name: '出险地点', type: 'address', key: 'damageAddress', span: 24, model: '', model2: '' },
      ],
      [
        { name: '出险经过', type: 'textarea', key: 'damageCourse', span: 24, model: '' }
      ],
      [
        { name: '事故原因说明', type: 'textarea', key: 'damageTypeDesc', span: 24, model: '' }
      ],
      [
        { name: '联系人姓名', type: 'input', key: 'linkerName', model: '', clearable: true },
        { name: '联系人手机号', type: 'input', key: 'linkerMobileNumber', model: '',  clearable: true }
      ],
      [
        { name: '联系人地址', type: 'address', key: 'linkerAddress', span: 24, model: '', model2: '' }
      ],
      [
        { name: '视频查勘', type: 'radio', key: 'isvideosurveyFlag', model: '1', options: [ { label: '视频', value: '1' }, { label: '非视频', value: '0' }] },
        { name: '大案标示', type: 'radio', key: 'bigcaseFlag', model: '0', options: [ { label: '是', value: '1' }, { label: '否', value: '0' }] }
      ],
      [
        { name: '第一现场标志', type: 'select', key: 'firstSiteFlag', model: '1', options: [{ label: '第一现场', value: '1'}, { label: '第二现场', value: '2'}, { label: '其他', value: '3'}] },
        { name: '赔案类型', type: 'select', key: 'claimType', model: '', options: [
          { label: '有责涉及死亡的赔案', value: '0' },
          { label: '有责不涉及死亡的赔案', value: '1' },
          { label: '无责赔案', value: '2' },
          { label: '垫付赔款', value: '3' },
          { label: '垫付救助基金', value: '4' },
          { label: '其他', value: '9' }
        ] },
      ]
    ]
  }

  /**
   * @name 雇主责任险保单报案保单信息数据
   * @returns 
   */
  getEmployerReportDetails () {
    return {
      name: '保单信息',
      model: '',
      children: [
        {
          name: '投保人信息',
          model: 'policy',
          type: 'browse',
          children: [
            { name: '投保人名称', model: 'insuredPersonName', type: '' },
            { name: '投保人证件类型', model: 'insuredPersonCardTypeId', type: '' },
            { name: '投保人证件号', model: 'insuredPersonCardNo', type: '' },
            { name: '证件照', model: 'businessLicense', type: 'images' },
            { name: '联系人名称', model: 'connectPersonName', type: '' },
            { name: '联系人电话', model: 'connectPersonPhone', type: '' },
            { name: '联系人邮箱', model: 'connectPersonEmail', type: '' },
            { name: '投保联系人地址', model1: 'insuredPersonProvince', model2: 'insuredPersonCity', model3: 'insuredPersonDistrict',  model: 'insuredPersonAddress', type: 'address' }
          ]
        },
        {
          name: '被保人信息',
          model: 'insured',
          type: 'table',
          children: [
            { name: '序号', model: 'number' },
            { name: '被保人企业名称', model: 'corpName' },
            { name: '被保人证件类型', model: 'cardTypeId' },
            { name: '被保人证件号', model: 'cardNo' },
            { name: '被保人地址', model: 'address' },
            { name: '联系人名称', model: 'connectName' },
            { name: '联系人电话', model: 'connectPhone' },
            { name: '联系人邮箱', model: 'connectEmail' }
          ]
        },
        {
          name: '保障期限',
          model: 'policy',
          type: 'browse',
          children: [
            { name: '起保日期', model: 'assureStartDate', type: 'date' },
            { name: '终保日期', model: 'assureEndDate', type: 'date' }
          ]
        },
        {
          name: '职业类别',
          model: 'occupation',
          type: 'Array',
          children: [
            { name: '职业类型', model: 'occupationName', type: '' },
            { name: '职业人数', model: 'occupationPersonNum', type: '' }
          ]
        },
        {
          name: '附加条款',
          model: 'additionalTerms',
          val: 'clauseContent',
          type: 'text',
          children: []
        },
        {
          name: '免赔金额',
          model: 'deductible',
          type: 'text',
          val: 'clauseContent',
          children: []
        },
        {
          name: '特别约定',
          model: 'specialAppointment',
          type: 'text',
          val: 'clauseContent',
          children: []
        },
      ]
    }
  }

  /**
   * @name 雇主责任险详情数据
   * @returns 
   */
  getEmployerReportList () {
    return {
      all: [
        {
          name: '投保人信息',
          model: 'policy',
          type: 'browse',
          id: 1,
          children: [
            [
              { name: '投保人名称', model: 'insuredPersonName', type: '' },
              { name: '投保人证件类型', model: 'insuredPersonCardTypeId', type: 'code' },
              { name: '投保人证件号', model: 'insuredPersonCardNo', type: '' }
            ],
            [
              { name: '营业执照', model: 'businessLicense', type: 'images' },
              { name: '联系人名称', model: 'connectPersonName', type: '' },
              { name: '联系人电话', model: 'connectPersonPhone', type: '' }
            ],
            [
              { name: '联系人邮箱', model: 'connectPersonEmail', type: '' },
              { name: '投保联系人地址', model: 'insuredPersonAddress', model1: 'insuredPersonProvince', model2: 'insuredPersonCity', model3: 'insuredPersonDistrict', type: 'address' },
            ]
          ]
        },
        {
          name: '被保人信息',
          model: 'insured',
          type: 'table',
          id: 2,
          children: [
            { name: '序号', model: 'number', width: '80px' },
            { name: '被保人企业名称', model: 'corpName', width: '200px', tips: true },
            { name: '被保人证件类型', model: 'cardTypeId', type: 'code' },
            { name: '被保人证件号', model: 'cardNo', tips: true },
            { name: '被保人地址', model: 'address', model1: 'provinceName', model2: 'cityName', model3: 'districtName', type: 'address', tips: true },
            { name: '联系人名称', model: 'connectName' },
            { name: '联系人电话', model: 'connectPhone', tips: true },
            { name: '联系人邮箱', model: 'connectEmail', tips: true }
          ]
        },
        {
          name: '保障期限',
          model: 'policy',
          type: 'browse',
          id: 3,
          children: [
            [
              { name: '起保日期', model: 'assureStartDate', type: 'date' },
              { name: '终保日期', model: 'assureEndDate', type: 'date' }
            ]
          ]
        },
        {
          name: '职业类别',
          model: 'occupation',
          type: 'browse2',
          id: 4,
          children: [
            { name: '职业类型', model: 'occupationName', type: '' },
            { name: '职业人数', model: 'occupationPersonNum', type: '' }
          ]
        },
        {
          name: '附加条款',
          model: 'additionalTerms',
          val: 'clauseContent',
          type: 'text',
          id: 5,
          children: []
        },
        {
          name: '免赔金额',
          model: 'deductible',
          type: 'text',
          val: 'clauseContent',
          id: 6,
          children: []
        },
        {
          name: '特别约定',
          model: 'specialAppointment',
          type: 'text',
          val: 'clauseContent',
          id: 7,
          children: []
        },
        {
          name: '升级方案',
          model: 'additional',
          val: 'additionalName',
          type: 'text',
          id:8,
          children: []
        },
        {
          name: '人员名单',
          model: 'person',
          type: 'table',
          id: 9,
          children: [
            { name: '序号', model: 'number' },
            { name: '职业', model: 'profession' },
            { name: '员工名称', model: 'personName' },
            { name: '性别', model: 'personSex' },
            { name: '证件类型', model: 'personCardType' },
            { name: '证件号', model: 'personCardNo' }
          ]
        },
        {
          name: '发票信息',
          model: 'bill',
          type: 'browse',
          id: 10,
          children: [
            [
              { name: '领取方式', model: 'collectionMethod', type: 'receiveType'}
            ],
            [
              { name: '发票抬头', model: 'billNo', type: '' },
              { name: '注册地址', model: 'registerAddress', model1: 'registerProvince', model2: 'registerCity', model3: 'registerDistrict', type: 'address' },
              { name: '投保人证件号', model: '', type: '' }
            ],
            [
              { name: '纳税人识别码', model: 'identifier', type: '' },
              { name: '开户行', model: 'accountBank', type: '' },
              { name: '银行卡号', model: 'bankCardNo', type: '' }
            ],
            [
              { name: '联系人', model: 'connectPerson', type: '' },
              { name: '联系电话', model: 'connectPhone', type: '' },
              { name: '座机号码', model: 'landlineNumber', type: '' },
            ],
            [
              { name: '联系地址', model: 'connectPersonAddress', model1: 'connectPersonProvince', model2: 'connectPersonCity', model3: 'connectPersonDistrict', type: 'address'}
            ]
          ]
        },
        {
          name: '授权扣费',
          model: '',
          type: 'deduction',
          id: 11,
          children: [
            [
              { name: '已选择', model: '', type: ''}
            ],
            [
              { name: '文员', model: '', type: '' },
              { name: '单价', model: '', type: '' }
            ],
            [
              { name: '货车司机', model: '', type: 'images' },
              { name: '单价', model: '', type: '' }
            ],
            [
              { name: '投保人数合计', model: '', type: '' },
              { name: '人数调整系数', model: '', type: '' }
            ]
          ]
        }
      ],
      policy: [
        {
          type: 'Single',
          column: 1,
          column2: '',
          name: '',
          children: [
            { name: '保单号', key: 'policy', model: 'policyNo', unit: '', type: '', enCode: '' }
          ]
        },
        {
          type: 'Single',
          column: 1,
          column2: '',
          name: '',
          children: [
            { name: '险种', key: '', model: '', unit: '', type: '', enCode: '' }
          ]
        },
        {
          type: 'Single',
          column: 1,
          column2: '',
          name: '',
          children: [
            { name: '保险公司', key: '', model: '', unit: '', type: '', enCode: '' }
          ]
        },
        {
          type: 'multiline',
          column: 1,
          column2: 2,
          name: '投保人',
          key: '',
          children: [
            { name: '名称', key: 'policy', model: 'insuredPersonName', unit: '', type: '', enCode: '' },
            { name: '联系地址', key: 'policy', model: 'insuredPersonAddress', unit: '', type: 'address', enCode: '', model1: 'insuredPersonProvince', model2: 'insuredPersonCity', model3: 'insuredPersonDistrict', },
            { name: '联系人', key: 'policy', model: 'connectPersonName', unit: '', type: '', enCode: '' },
            { name: '联系电话', key: 'policy', model: 'connectPersonPhone', unit: '', type: '', enCode: '' },
            { name: '投保人证件号类型', key: 'policy', model: 'insuredPersonCardTypeId', unit: '', type: 'certificates', enCode: '' }
          ]
        },
        {
          type: 'multiline',
          column: 1,
          column2: 2,
          name: '被保人',
          class: 'insured',
          key: 'insured',
          children: [
            { name: '名称', key: 'corpName', model: 'corpName', unit: '', type: '', enCode: '' },
            { name: '联系地址' ,key: 'address', model: 'address', unit: '', type: 'address', enCode: '', model1: 'provinceName', model2: 'cityName', model3: 'districtName' },
            { name: '联系人', key: 'connectName', model: 'connectName', unit: '', type: '', enCode: '' },
            { name: '联系电话', key: 'connectPhone', model: 'connectPhone', unit: '', type: '', enCode: '' },
            { name: '投保人证件号类型', key: 'cardTypeId', model: 'cardTypeId', unit: '', type: 'certificates', enCode: '' }
          ]
        },
        {
          type: 'Single',
          column: 1,
          column2: '',
          name: '',
          children: [
            { name: '保险期限', key: 'policy', textAlign: 'centent', endTime: 'assureEndDate', startTiem: 'assureStartDate', unit: '', type: 'term', dateType: 'date', enCode: '' }
          ]
        },
        {
          type: 'Single',
          column: 1,
          column2: '',
          name: '',
          children: [
            { name: '总保险费', textAlign: 'centent', key: 'policy', model: 'totalPremium', unit: '元', type: 'money', enCode: '' }
          ]
        },
        {
          type: 'Single',
          column: 1,
          column2: '',
          name: '',
          children: [
            { name: '总保险额', textAlign: 'centent', key: '', model: '', unit: '', type: '', enCode: '' }
          ]
        },
        {
          type: 'Single',
          column: 1,
          column2: '',
          name: '',
          children: [
            { name: '签单日期', textAlign: 'centent', key: '', model: '', unit: '', type: '', enCode: '' }
          ]
        },
      ]
    }
    return 
  }

  /**
   * @name 雇主责任险保单报案信息录入信息数据
   * @returns 
   */
  getEmployerReportInput () {
    return [
      [
        { name: '保单号', type: 'input', key: 'policyNo', disabled: true, model: '' },
        { name: '被保人名称', type: 'input', key: 'licenseNo', disabled: true, model: '' }
      ],
      [
        { name: '报案日期', type: 'date', key: 'reportDate', model: '' },
        { name: '报案人姓名', type: 'input', key: 'reportorName', model: '' },
        { name: '报案人手机号', type: 'number', key: 'reportorMobile', model: '' }
      ],
      [
        { name: '出险日期', type: 'date', key: 'reportDate', model: '' },
        { name: '出险区域描述', type: 'input', key: 'damageAreaDesc', model: '' }
      ],
      [
        { name: '出险地点', type: 'address', key: 'damageAddress', span: 24, model: '', model2: '' },
      ],
      [
        { name: '出险原因', type: 'textarea', key: 'damageCourse', span: 24, model: '' }
      ],
      [
        { name: '联系人姓名', type: 'input', key: 'linkerName', model: '', clearable: true },
        { name: '联系人手机号', type: 'input', key: 'linkerMobileNumber', model: '', clearable: true }
      ],
      [
        { name: '联系人地址', type: 'address', key: 'linkerAddress', span: 24, model: '', model2: '' }
      ],
    ]
  }

  /**
   * @name 车险理赔底部展示数据信息
   * @returns 
   */
  getCarInsuranceDetailsArray () {
    return [
      {
        name: '保单信息',
        model: 'carPolicyDTO',
        children: [
          {
            name: '保单信息',
            model: 'carPolicyDTO',
            type: 'browse',
            children: [
              { name: '保单号', model: 'policyNo' },
              { name: '保险公司', model: 'productCompany' },
              { name: '险种名称', model: 'riskName' },
              { name: '投保人', model: 'insuredPersonName' },
              { name: '被保人', model: 'insuredName' },
              { name: '起保日期', model: 'assureStartDate', type: 'date' },
              { name: '终保日期', model: 'assureEndDate',type: 'date' },
              { name: '签单日期', model: 'underwriteEndDate', type: 'date' },
              { name: '签单保费', model: 'totalPremium' },
              { name: '保费收入', model: 'incomeMoney' },
              { name: '手续费比例', model: 'disRate' }
            ]
          },
          {
            name: '车辆信息',
            model: 'carCitemcarDTO',
            type: 'browse',
            children: [
              { name: '车牌号', model: 'carNum' },
              { name: '车主', model: 'carOwner' },
              { name: '新车购置价', model: 'purchasePrice'},
              { name: '车型名称', model: 'modelName' },
              { name: '座位数', model: 'seatCount' },
              { name: '车架号', model: 'frameNo'},
              { name: '发动机号', model: 'engineNo' },
              { name: '初登日期', model: 'enrollDate', type: 'date' },
              { name: '使用年限', model: 'useYears' },
              { name: '核定载质量(吨)', model: 'tonCount' }
            ]
          },
          {
            name: '险别信息',
            model: 'carCitemkindDTO',
            type: 'browse',
            column: 2,
            children: [
              { name: '车损保额', model: 'aamount', span: 12 },
              { name: '车损保费', model: 'apremium', span: 12 },
              { name: '三者保额', model: 'bamount', span: 12 },
              { name: '三者保费', model: 'bpremium', span: 12 },
              { name: '车上人员(司机)保额', model: 'd11Premium', span: 12 },
              { name: '车上人员(司机)保费', model: 'd11Amount', span: 12 },
              { name: '盗抢保额', model: 'gamount', span: 12 },
              { name: '盗抢保费', model: 'gpremium', span: 12 },
              { name: '新增设备保额', model: 'xamount', span: 12 },
              { name: '新增设备保费', model: 'xpremium', span: 12 },
              { name: '车身划痕损失险保额', model: 'laMount', span: 12 },
              { name: '车身划痕损失险保费', model: 'lpremium', span: 12 },
              { name: '精神损害慰问金责任险保额', model: 'ramount', span: 12 },
              { name: '精神损害慰问金责任险保费', model: 'rpremium', span: 12 },
              { name: '假日限额翻倍险保额', model: 'jiariAmount', span: 12 },
              { name: '假日限额翻倍险保费', model: 'jiariPremium', span: 12 },
              { name: '自燃保额', model: 'zaMount', span: 12 },
              { name: '自燃保费', model: 'zpremium', span: 12 },
              { name: '涉水保额', model: 'x1Amount', span: 12 },
              { name: '涉水保费', model: 'x1Premium', span: 12 },
              { name: '机动车损失险无法找到第三方特约险保费', model: 'null1Premium', span: 12 },
              { name: '机动车损失险无法找到第三方特约险保额', model: 'null1Amount', span: 12 },
            ]
          }
        ]
      },
      {
        name: '报案信息',
        model: 'carLregistDTO',
        children: [
         {
           model: 'carLregistDTO',
           type: 'browse',
           children: [
            { name: '保单号', model: 'policyNo'},
            { name: '事故号码', model: 'accidentNo'},
            { name: '报案号码', model: 'registNo'},
            { name: '车牌号', model: 'licenseNo'},
            { name: '车架号', model: 'frameNo'},
            { name: '报案日期', model: 'reportDate', type: 'date'},
            { name: '报案人姓名', model: 'reportorName'},
            { name: '报案人手机号', model: 'reportorMobile'},
            { name: '出险日期', model: 'damageStartDate', type: 'date'},
            { name: '出险地点', model: 'damageAddress'},
            { name: '出险原因', model: 'damagereasonDesc'},
            { name: '出险经过', model: 'damageCourse'},
            { name: '事故原因说明', model: 'damageTypeDesc'},
            { name: '联系人姓名', model: 'linkerName'},
            { name: '联系人手机号', model: 'linkerMobileNumber'},
            { name: '联系人地址', model: 'damageAddress'},
            { name: '视频查勘', model: 'isvideosurveyFlag', type: 'code' },
            { name: '大案标示', model: 'bigcaseFlag', type: 'code' },
            { name: '第一现场标志', model: 'firstSiteFlag', type: 'code' },
            { name: '赔案类型', model: 'claimType', type: 'code' },
           ]
         }
        ]
      },
      {
        name: '立案信息',
        model: 'carLclaimDTO',
        children: [
          {
            model: 'carLclaimDTO',
            type: 'browse',
            children: [
              { name: '立案号码', model: 'claimNo' },
              { name: '立案日期', model: 'claimDate', type:'date'},
              { name: '估损金额', model: 'sumClaim' },
              { name: '总赔付金额', model: 'sumPaid' },
              { name: '总追偿金额', model: 'sumReplevy' },
              { name: '是否涉及诉讼', model: 'isLawsuit' }
            ]
          }
        ]
      },
      {
        name: '定损信息',
        model: '',
        children: [
          {
            name: '车损',
            model: 'carLassessCarDTOList',
            type: 'collapse',
            class: 'vehicle',
            activeNames: [0],
            children: [
              { name: '标的车辆标志', model: 'insuredCarFlag', type: 'code' },
              { name: '车牌号', model: 'licenseNo' },
              { name: '发动机编号', model: 'engineNo' },
              { name: '是否火自爆', model: 'isHotSinceDetonation' },
              { name: '是否涉水', model: 'isWaterFloot' },
              { name: '修理日期', model: 'repairDate', type: 'date' },
              { name: '修理厂类型', model: 'repairFactoryType' },
              { name: '修理厂名称', model: 'repairFactoryName' },
              { name: '约定交车日期', model: 'deliveryDate', type: 'date' },
              { name: '定损开始时间', model: 'assessStartDate', type: 'date' },
              { name: '定损结束时间', model: 'assessEndDate', type: 'date' },
              { name: '初次定损金额', model: 'firstAssessLoss' },
              { name: '定损金额', model: 'sumAssessLoss' },
              { name: '定损非回收残值合计', model: 'sumAssessRest' },
              { name: '定损施救费', model: 'assessSalvageFee' },
              { name: '总配件费', model: 'sumAssessComponentFee' },
              { name: '定损工时费合计', model: 'sumAssessRepairFee' },
              { name: '定损人员', model: 'assesserName' },
              { name: '定损人电话', model: 'assesserPhone' },
              { name: '核损开始时间', model: 'verifyStartDate', type: 'date' },
              { name: '核损结束时间', model: 'verifyendDate', type: 'date' },
              { name: '核损金额', model: 'sumVerifyLoss' },
              { name: '核损非回收残值合计', model: 'sumVerifyRest' },
              { name: '核损施救费', model: 'verifySalvageFee' },
              { name: '核损配件费合计', model: 'sumVerifyComponentFee' },
              { name: '核损工时费合计', model: 'sumVerifyRepairFee' }
            ]
          },
          {
            name: '物损',
            model: 'carLassessPropDTOList',
            type: 'collapse',
            class: 'matter',
            activeNames: [0],
            children: [
              { name: '损失描述', model: 'lossDesc' },
              { name: '车牌号码', model: 'licenseNo' },
              { name: '查勘/代查勘地点', model: 'surveyAddress' },
              { name: '定损开始时间', model: 'assessStartDate', type: 'date' },
              { name: '定损结束时间', model: 'assessendDate', type: 'date' },
              { name: '定损金额', model: 'sumAssessLoss' },
              { name: '定损施救费', model: 'assessSalvageFee' },
              { name: '定损人员', model: 'assesserName' },
              { name: '定损人电话', model: 'assesserPhone' },
              { name: '核损开始时间', model: 'verifyStartDate', type: 'date' },
              { name: '核损结束时间', model: 'verifyendDate', type: 'date' },
              { name: '第一次核损结束时间', model: 'firstVerifyEndTime', type: 'date' },
              { name: '核损金额', model: 'sumVerifyLoss' },
              { name: '核损施救费', model: 'verifySalvageFee' },
              { name: '备注', model: 'remark' }
            ]
          },
          {
            name: '人伤',
            model: 'carLassessPersonDTOList',
            type: 'collapse',
            class: 'people',
            activeNames: [0],
            children: [
              { name: '车牌号码', model: 'licenseNo' },
              { name: '事故地', model: 'accidentAreaCode' },
              { name: '人员姓名', model: 'personName' },
              { name: '年龄', model: 'age' },
              { name: '性别', model: 'sex', type: 'code' },
              { name: '身份证号', model: 'identityNo' },
              { name: '联系方式', model: 'checkPhone' },
              { name: '工作单位', model: 'workPlace' },
              { name: '收入情况', model: 'incomeCode' },
              { name: '出险日期', model: 'damageDate', type: 'date' },
              { name: '入院日期', model: 'inhospDate', type: 'date' },
              { name: '诊断意见', model: 'woundDesc' },
              { name: '诉讼标识', model: 'isLawsuit' },
              { name: '赔偿标准地', model: 'compensateAreaCode' },
              { name: '定损开始时间', model: 'assessStartDate', type: 'date' },
              { name: '定损结束时间', model: 'assessEndDate', type: 'date' },
              { name: '定损金额', model: 'sumAssessLoss' },
              { name: '定损医疗费', model: 'assessMedicalExpenses' },
              { name: '定损施救费', model: 'assessSalvageFee' },
              { name: '核损金额', model: 'sumVerifyLoss' },
              { name: '核损施救费', model: 'verifySalvageFee' },
              { name: '定损人员', model: 'assesserName' },
              { name: '定损人电话', model: 'assesserPhone' },
              { name: '核损开始时间', model: 'verifyStartDate', type: 'date' },
              { name: '核损结束时间', model: 'verifyEndDate', type: 'date' }
            ]
          },
        ]
      },
      {
        name: '理算信息',
        model: 'carLcompensateDTOList',
        children: [
          {
            name: '理算信息',
            model: 'carLcompensateDTOList',
            type: 'collapse',
            class: 'adjustment',
            activeNames: [0],
            children: [
              { name: '核赔日期', model: 'underwriteEndDate', type: 'date' },
              { name: '赔款计算书号码', model: 'ompenSateNo' },
              { name: '币种', model: 'currency' },
              { name: '预赔金额', model: 'sumPrePaid' },
              { name: '本次赔付金额', model: 'sumThisPaid' },
              { name: '责任赔款金额', model: 'sumDutyPaid' },
              { name: '不计赔款金额', model: 'sumNodutyFee' },
              { name: '总损失金额', model: 'sumLoss' },
              { name: '总赔付金额', model: 'sumPaid' },
              { name: '领款人', model: 'receiverName' },
              { name: '银行账号', model: 'accountCode' },
              { name: '开户银行', model: 'bank' }
            ]
          }
        ]
      },
      {
        name: '结案信息',
        model: 'carWebListLpDTO',
        children: [
          {
            model: 'carWebListLpDTO',
            type: 'browse',
            children: [
              { name: '保单号', model: 'policyNo' },
              { name: '报案号码', model: 'registNo' },
              { name: '立案号码', model: 'claimNo' },
              { name: '险种名称', model: 'riskName' },
              { name: '报案日期', model: 'claimDate', type: 'date' },
              { name: '立案日期', model: 'claimDate', type: 'date' },
              { name: '出险日期', model: 'damageStartDate', type: 'date' },
              { name: '出险原因说明', model: 'damageReasonDesc' },
              { name: '估损金额', model: 'sumClaim' },
              { name: '案件类型', model: 'caseType' },
              { name: '结案日期', model: 'endcaseDate', type: 'date' },
              { name: '核赔(注销/拒赔)日期', model: 'underwriteEndDate', type: 'date' },
              { name: '共保比率', model: 'coinsRate' },
              { name: '直接理赔费用', model: 'directpaidFee' },
              { name: '已决赔款', model: 'settledLoss' },
              { name: '币种', model: 'currency' }
            ]
          }
        ]
      }
    ]
  }

  /**
   * @name 获取雇主责任险理赔案件底部表单
   * @returns 
   */
  getEmployerDetailsArray () {
    return [
      {
        name: '保单信息',
        model: '',
        children: [
          {
            name: '',
            model: 'policy',
            type: 'publicDetalisTable',
            children: [
              {
                type: 'Single',
                column: 1,
                column2: '',
                name: '',
                children: [
                  { name: '保单号', key: 'policy', model: 'policyNo', unit: '', type: '', enCode: '' }
                ]
              },
              {
                type: 'Single',
                column: 1,
                column2: '',
                name: '',
                children: [
                  { name: '险种', key: '', model: '', unit: '', type: '', enCode: '' }
                ]
              },
              {
                type: 'Single',
                column: 1,
                column2: '',
                name: '',
                children: [
                  { name: '保险公司', key: '', model: '', unit: '', type: '', enCode: '' }
                ]
              },
              {
                type: 'multiline',
                column: 1,
                column2: 2,
                name: '投保人',
                key: '',
                children: [
                  { name: '名称', key: 'policy', model: 'insuredPersonName', unit: '', type: '', enCode: '' },
                  { name: '联系地址', key: 'policy', model: 'insuredPersonAddress', unit: '', type: 'address', enCode: '', model1: 'insuredPersonProvince', model2: 'insuredPersonCity', model3: 'insuredPersonDistrict', },
                  { name: '联系人', key: 'policy', model: 'connectPersonName', unit: '', type: '', enCode: '' },
                  { name: '联系电话', key: 'policy', model: 'connectPersonPhone', unit: '', type: '', enCode: '' },
                  { name: '投保人证件号类型', key: 'policy', model: 'insuredPersonCardTypeId', unit: '', type: 'certificates', enCode: '' }
                ]
              },
              {
                type: 'multiline',
                column: 1,
                column2: 2,
                name: '被保人',
                class: 'insured',
                key: 'insured',
                children: [
                  { name: '名称', key: 'corpName', model: 'corpName', unit: '', type: '', enCode: '' },
                  { name: '联系地址' ,key: 'address', model: 'address', unit: '', type: 'address', enCode: '', model1: 'provinceName', model2: 'cityName', model3: 'districtName' },
                  { name: '联系人', key: 'connectName', model: 'connectName', unit: '', type: '', enCode: '' },
                  { name: '联系电话', key: 'connectPhone', model: 'connectPhone', unit: '', type: '', enCode: '' },
                  { name: '投保人证件号类型', key: 'cardTypeId', model: 'cardTypeId', unit: '', type: 'certificates', enCode: '' }
                ]
              },
              {
                type: 'Single',
                column: 1,
                column2: '',
                name: '',
                children: [
                  { name: '保险期限', key: 'policy', textAlign: 'centent', endTime: 'assureEndDate', startTiem: 'assureStartDate', unit: '', type: 'term', dateType: 'date', enCode: '' }
                ]
              },
              {
                type: 'Single',
                column: 1,
                column2: '',
                name: '',
                children: [
                  { name: '总保险费', textAlign: 'centent', key: 'policy', model: 'totalPremium', unit: '元', type: 'money', enCode: '' }
                ]
              },
              {
                type: 'Single',
                column: 1,
                column2: '',
                name: '',
                children: [
                  { name: '总保险额', textAlign: 'centent', key: '', model: '', unit: '', type: '', enCode: '' }
                ]
              },
              {
                type: 'Single',
                column: 1,
                column2: '',
                name: '',
                children: [
                  { name: '签单日期', textAlign: 'centent', key: '', model: '', unit: '', type: '', enCode: '' }
                ]
              },
            ]
          }
          //   name: '投保人信息',
          //   model: 'policy',
          //   type: 'browse',
          //   children: [
          //     { name: '投保人名称', model: 'insuredPersonName', type: '' },
          //     { name: '投保人证件类型', model: 'insuredPersonCardTypeId', type: '' },
          //     { name: '投保人证件号', model: 'insuredPersonCardNo', type: '' },
          //     { name: '证件照', model: 'businessLicense', type: 'images' },
          //     { name: '联系人名称', model: 'connectPersonName', type: '' },
          //     { name: '联系人电话', model: 'connectPersonPhone', type: '' },
          //     { name: '联系人邮箱', model: 'connectPersonEmail', type: '' },
          //     { name: '投保联系人地址', model1: 'insuredPersonProvince', model2: 'insuredPersonCity', model3: 'insuredPersonDistrict',  model: 'insuredPersonAddress', type: 'address' }
          //   ]
          // },
          // {
          //   name: '被保人信息',
          //   model: 'insured',
          //   type: 'table',
          //   children: [
          //     { name: '序号', model: 'number' },
          //     { name: '被保人企业名称', model: 'corpName' },
          //     { name: '被保人证件类型', model: 'cardTypeId' },
          //     { name: '被保人证件号', model: 'cardNo' },
          //     { name: '被保人地址', model: 'address' },
          //     { name: '联系人名称', model: 'connectName' },
          //     { name: '联系人电话', model: 'connectPhone' },
          //     { name: '联系人邮箱', model: 'connectEmail' }
          //   ]
          // },
          // {
          //   name: '保障期限',
          //   model: 'policy',
          //   type: 'browse',
          //   children: [
          //     { name: '起保日期', model: 'assureStartDate', type: 'date' },
          //     { name: '终保日期', model: 'assureEndDate', type: 'date' }
          //   ]
          // },
          // {
          //   name: '职业类别',
          //   model: 'occupation',
          //   type: 'Array',
          //   children: [
          //     { name: '职业类型', model: 'occupationName', type: '' },
          //     { name: '职业人数', model: 'occupationPersonNum', type: '' }
          //   ]
          // },
          // {
          //   name: '附加条款',
          //   model: 'additionalTerms',
          //   val: 'clauseContent',
          //   type: 'text',
          //   children: []
          // },
          // {
          //   name: '免赔金额',
          //   model: 'deductible',
          //   type: 'text',
          //   val: 'clauseContent',
          //   children: []
          // },
          // {
          //   name: '特别约定',
          //   model: 'specialAppointment',
          //   type: 'text',
          //   val: 'clauseContent',
          //   children: []
          // },
        ]
      },
      {
        name: '报案信息',
        model: 'nonCarLregistDTO',
        children: [
          {
            name: '',
            model: 'nonCarLregistDTO',
            type: 'browse',
            children: [
              { name: '保单号', key: 'nonCarLregistDTO', model: 'policyNo' },
              { name: '报案号码', key: 'nonCarLregistDTO', model: 'registNo' },
              { name: '报案日期', key: 'nonCarLregistDTO', model: 'reportDate', type: 'time', enCode: 'date' },
              { name: '报案人姓名', key: 'nonCarLregistDTO', model: 'reportorName'},
              { name: '报案人手机号', key: 'nonCarLregistDTO', model: 'reportorPhoneNumber'},
              { name: '出险日期', key: 'nonCarLregistDTO', model: 'damageStartDate', type: 'time', enCode: 'date' },
              { name: '出险地点', key: 'nonCarLregistDTO', model: 'damageAddress'},
              { name: '出险区域描述', key: 'nonCarLregistDTO', model: 'damageAreaDesc'},
              { name: '出险原因', key: 'nonCarLregistDTO', model: 'damagereasonDesc'},
              { name: '联系人名称', key: 'nonCarLregistDTO', model: 'linkerName'},
              { name: '联系人电话', key: 'nonCarLregistDTO', model: 'phoneNumber'},
              { name: '联系人地址', key: 'nonCarLregistDTO', model: 'linkerAddress'},
            ]
          }
        ]
      },
      {
        name: '立案信息',
        model: 'nonCarLclaimDTO',
        children: [
          {
            name: '',
            model: 'nonCarLclaimDTO',
            type: 'browse',
            children: [
              { name: '报案号', key: 'nonCarLclaimDTO', model: 'registNo'},
              { name: '立案号', key: 'nonCarLclaimDTO', model: 'claimNo'},
              { name: '案件类型', key: 'nonCarLclaimDTO', model: 'caseType'},
              { name: '赔款类型', key: 'nonCarLclaimDTO', model: 'claimType'},
              { name: '立案日期', key: 'nonCarLclaimDTO', model: 'claimDate', type:'time', enCode: 'time' },
              { name: '报案日期', key: 'nonCarLclaimDTO', model: 'reportDate', type:'time', enCode: 'time' },
              { name: '估损金额', key: 'nonCarLclaimDTO', model: 'sumClaim'},
              { name: '最大估损金额', key: 'nonCarLclaimDTO', model: 'maxSumClaim'},
              { name: '最小估损金额', key: 'nonCarLclaimDTO', model: 'minSumClaim'},
              { name: '初次估损金额', key: 'nonCarLclaimDTO', model: 'firstSumClaim'},
              { name: '直接理赔费用', key: 'nonCarLclaimDTO', model: 'directPaidFee'},
            ]
          }
        ]
      },
      {
        name: '估损信息',
        model: 'nonCarLclaimlossDTOList',
        children: [
          {
            name: '',
            model: 'nonCarLclaimlossDTOList',
            type: 'collapse',
            titleModel: '',
            class: 'adjustment1',
            activeNames: [0],
            children: [
              { name: '损失费用类型', key: 'nonCarLclaimlossDTOList', model: 'lossfeeType' },
              { name: '估损金额', key: 'nonCarLclaimlossDTOList', model: 'sumClaim' },
              { name: '免赔额', key: 'nonCarLclaimlossDTOList', model: 'deductible' },
              { name: '损失详细情况', key: 'nonCarLclaimlossDTOList', model: 'itemdetailDesc' },
            ]
          }
        ]
      },
      {
        name: '理算信息',
        model: 'nonCarLcompensateDTOList',
        children: [
          {
            name: '',
            model: 'nonCarLcompensateDTOList',
            type: 'collapse',
            class: 'adjustment2',
            titleModel: '',
            activeNames: [0],
            children: [
              { name: '结案号', key: 'nonCarLcompensateDTOList', model: 'caseNo' },
              { name: '预赔金额', key: 'nonCarLcompensateDTOList', model: 'sumPrePaid' },
              { name: '汇率', key: 'nonCarLcompensateDTOList', model: 'exchRate' },
              { name: '币种', key: 'nonCarLcompensateDTOList', model: 'currency' },
              { name: '核赔日期', key: 'nonCarLcompensateDTOList', model: 'underwriteEndDate', type:'time', enCode: 'time' },
              { name: '理赔类型', key: 'nonCarLcompensateDTOList', model: 'ltype' },
              { name: '本次赔付金额', key: 'nonCarLcompensateDTOList', model: 'sumThisPaid' },
              { name: '总赔付金额', key: 'nonCarLcompensateDTOList', model: 'sumPaid' },
              { name: '不计赔款金额', key: 'nonCarLcompensateDTOList', model: 'sumNodutyFee' },
              { name: '责任赔款金额', key: 'nonCarLcompensateDTOList', model: 'sumDutyPaid' },
              { name: '总损失金额', key: 'nonCarLcompensateDTOList', model: 'sumLoss' },
              { name: '损余金额', key: 'nonCarLcompensateDTOList', model: 'sumRest' }
            ]
          }
        ]
      },
      {
        name: '赔案信息',
        model: 'nonCarWebListLpDTO',
        children: [
          {
            name: '',
            model: 'nonCarWebListLpDTO',
            type: 'browse',
            children: [
              { name: '出险原因说明', key: 'nonCarWebListLpDTO', model: 'damageReasonDesc' },
              { name: '案件类型', key: 'nonCarWebListLpDTO', model: 'caseType' },
              { name: '估损金额', key: 'nonCarWebListLpDTO', model: 'sumClaim' },
              { name: '结案日期', key: 'nonCarWebListLpDTO', model: 'endcaseDate', type:'time', enCode: 'time'},
              { name: '核赔(注销/拒赔)日期', key: 'nonCarWebListLpDTO', model: 'underwriteEndDate', type:'time', enCode: 'time'},
              { name: '共保比率', key: 'nonCarWebListLpDTO', model: 'coinsRate' },
              { name: '直接理赔费用', key: 'nonCarWebListLpDTO', model: 'directpaidFee' },
              { name: '已决赔款', key: 'nonCarWebListLpDTO', model: 'settledLoss' },
              { name: '币种', key: 'nonCarWebListLpDTO', model: 'currency' }
            ]
          }
        ]
      }
    ]
  }
}
export default index 