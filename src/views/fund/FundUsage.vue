<template>
  <div class="fund-usage">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <span class="title-bar"></span>
        <span class="title-text">资金使用</span>
      </div>
      <el-button type="text" class="back-btn">
        <i class="el-icon-back"></i> 返回
      </el-button>
    </div>

    <!-- 统计卡片区域 -->
    <div class="stat-cards">
      <!-- 集团已支付 -->
      <div class="stat-card blue-card">
        <div class="card-header">
          <div class="card-icon blue-icon">
            <i class="el-icon-wallet"></i>
          </div>
          <span class="card-title">集团已支付（万元）</span>
        </div>
        <div class="card-body">
          <div class="main-amount">
            <span class="amount-value">117,123</span>
            <span class="amount-label">已支付总额</span>
          </div>
          <div class="sub-amounts">
            <div class="sub-item">
              <span class="sub-label">征拆类</span>
              <span class="sub-value blue">12,124</span>
            </div>
            <div class="sub-item">
              <span class="sub-label">建设类</span>
              <span class="sub-value blue">4,124</span>
            </div>
            <div class="sub-item">
              <span class="sub-label">其他</span>
              <span class="sub-value blue">1,134</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 实际已支付 -->
      <div class="stat-card green-card">
        <div class="card-header">
          <div class="card-icon green-icon">
            <i class="el-icon-success"></i>
          </div>
          <span class="card-title">实际已支付（万元）</span>
        </div>
        <div class="card-body">
          <div class="main-amount">
            <span class="amount-value">117,123</span>
            <span class="amount-label">已支付总额</span>
          </div>
          <div class="sub-amounts">
            <div class="sub-item">
              <span class="sub-label">征拆类</span>
              <span class="sub-value green">12,124</span>
            </div>
            <div class="sub-item">
              <span class="sub-label">建设类</span>
              <span class="sub-value green">4,124</span>
            </div>
            <div class="sub-item">
              <span class="sub-label">其他</span>
              <span class="sub-value green">1,134</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 拨付未支付 -->
      <div class="stat-card orange-card">
        <div class="card-header">
          <div class="card-icon orange-icon">
            <i class="el-icon-warning"></i>
          </div>
          <span class="card-title">拨付未支付（万元）</span>
        </div>
        <div class="card-body">
          <div class="main-amount">
            <span class="amount-value">117,123</span>
            <span class="amount-label">已支付总额</span>
          </div>
          <div class="sub-amounts">
            <div class="sub-item">
              <span class="sub-label">征拆类</span>
              <span class="sub-value orange">12,124</span>
            </div>
            <div class="sub-item">
              <span class="sub-label">建设类</span>
              <span class="sub-value orange">4,124</span>
            </div>
            <div class="sub-item">
              <span class="sub-label">其他</span>
              <span class="sub-value orange">1,134</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 切换 -->
    <div class="content-section">
      <el-tabs v-model="activeTab" class="custom-tabs">
        <el-tab-pane label="集团支付台账" name="group"></el-tab-pane>
        <el-tab-pane label="拨付给镇街" name="town"></el-tab-pane>
        <el-tab-pane label="镇街支付台账" name="townPay"></el-tab-pane>
        <el-tab-pane label="镇街退还台账" name="townReturn"></el-tab-pane>
      </el-tabs>

      <!-- 搜索表单 -->
      <div class="search-form">
        <el-form :inline="true" :model="searchForm" class="form-inline">
          <el-form-item label="项目名称">
            <el-input v-model="searchForm.projectName" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="单位名称">
            <el-input v-model="searchForm.unitName" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="银行账户">
            <el-input v-model="searchForm.bankAccount" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="资金性质">
            <el-input v-model="searchForm.fundType" placeholder="" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否为工作经费">
            <el-input v-model="searchForm.isWorkFund" placeholder="" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否为资本金">
            <el-input v-model="searchForm.isCapital" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <el-button type="primary" size="small">
          <i class="el-icon-download"></i> 导入
        </el-button>
        <el-button type="success" size="small">
          <i class="el-icon-edit"></i> 登记
        </el-button>
        <el-button type="primary" size="small" plain>
          <i class="el-icon-upload2"></i> 导出EXCEL
        </el-button>
      </div>

      <!-- 数据表格 -->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        class="data-table"
        :header-cell-style="{background:'#fafafa',color:'#333',fontWeight:'500'}"
      >
        <el-table-column prop="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="paymentNo" label="支付单号" width="140" align="center"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="80" align="center"></el-table-column>
        <el-table-column prop="paymentUnit" label="付款单位" width="200" align="center"></el-table-column>
        <el-table-column prop="bankAccount" label="银行账户" width="120" align="center"></el-table-column>
        <el-table-column prop="fundType" label="资金性质" width="130" align="center"></el-table-column>
        <el-table-column prop="expenditureType" label="资金支出属性" width="130" align="center"></el-table-column>
        <el-table-column prop="amount" label="数额（万元）" width="110" align="center"></el-table-column>
        <el-table-column prop="isWorkFund" label="是否为工作经费" width="120" align="center"></el-table-column>
        <el-table-column prop="isCapital" label="是否" width="60" align="center"></el-table-column>
        <el-table-column label="操作" width="80" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button 
              type="text" 
              size="small"
              :class="scope.row.actionType === 'audit' ? 'audit-btn' : 'view-btn'"
            >
              {{ scope.row.actionText }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FundUsage',
  data() {
    return {
      activeTab: 'group',
      searchForm: {
        projectName: '',
        unitName: '',
        bankAccount: '',
        fundType: '',
        isWorkFund: '',
        isCapital: ''
      },
      tableData: [
        {
          index: 1,
          paymentNo: 'ZF202501010001',
          projectName: '陈田村',
          paymentUnit: '广州白云城市发展集团有限公司',
          bankAccount: '土发专户 1',
          fundType: '中央补助资金',
          expenditureType: '征收补偿安置费',
          amount: '2000',
          isWorkFund: '否',
          isCapital: '',
          actionText: '审核',
          actionType: 'audit'
        },
        {
          index: 2,
          paymentNo: 'ZF202501010001',
          projectName: '陈田村',
          paymentUnit: '广州白云城市发展集团有限公司',
          bankAccount: '经费专户 2',
          fundType: '重大项目前期工作经费',
          expenditureType: '前期工作费',
          amount: '80',
          isWorkFund: '是',
          isCapital: '',
          actionText: '查看',
          actionType: 'view'
        },
        {
          index: 3,
          paymentNo: 'ZF202501010001',
          projectName: '陈田村',
          paymentUnit: '广州白云城市发展集团有限公司',
          bankAccount: '专项借款户 3',
          fundType: '专项借款',
          expenditureType: '安置房项目建设费',
          amount: '3500',
          isWorkFund: '否',
          isCapital: '',
          actionText: '查看',
          actionType: 'view'
        },
        {
          index: 4,
          paymentNo: 'ZF20250101001',
          projectName: '陈田村',
          paymentUnit: '广州白云城市发展集团有限公司',
          bankAccount: '专项债户 4',
          fundType: '专项债',
          expenditureType: '基础设施项目建设费',
          amount: '2200',
          isWorkFund: '否',
          isCapital: '',
          actionText: '查看',
          actionType: 'view'
        },
        {
          index: 5,
          paymentNo: 'ZF202501010001',
          projectName: '陈田村',
          paymentUnit: '广州白云城市发展集团有限公司',
          bankAccount: '自有资金户 5',
          fundType: '自有资金',
          expenditureType: '利息费用',
          amount: '60',
          isWorkFund: '否',
          isCapital: '',
          actionText: '查看',
          actionType: 'view'
        },
        {
          index: 6,
          paymentNo: 'ZF202501010001',
          projectName: '陈田村',
          paymentUnit: '广州白云城市发展集团有限公司',
          bankAccount: '其他流入户 6',
          fundType: '其它流入',
          expenditureType: '其它费用',
          amount: '30',
          isWorkFund: '否',
          isCapital: '',
          actionText: '查看',
          actionType: 'view'
        },
        {
          index: 7,
          paymentNo: 'ZF202501010001',
          projectName: '陈田村',
          paymentUnit: '广州白云城市发展集团有限公司',
          bankAccount: '专项借款户 7',
          fundType: '专项借款',
          expenditureType: '安置房项目建设费',
          amount: '4000',
          isWorkFund: '否',
          isCapital: '',
          actionText: '查看',
          actionType: 'view'
        },
        {
          index: 8,
          paymentNo: 'ZF202501010001',
          projectName: '陈田村',
          paymentUnit: '广州白云城市发展集团有限公司',
          bankAccount: '经费专户 8',
          fundType: '重大项目前期工作经费',
          expenditureType: '前期工作费',
          amount: '50',
          isWorkFund: '是',
          isCapital: '',
          actionText: '查看',
          actionType: 'view'
        },
        {
          index: 9,
          paymentNo: 'ZF202501010001',
          projectName: '陈田村',
          paymentUnit: '广州白云城市发展集团有限公司',
          bankAccount: '自有资金户 9',
          fundType: '自有资金',
          expenditureType: '日常支出',
          amount: '10',
          isWorkFund: '否',
          isCapital: '',
          actionText: '查看',
          actionType: 'view'
        },
        {
          index: 10,
          paymentNo: 'ZF202501010001',
          projectName: '陈田村',
          paymentUnit: '广州白云城市发展集团有限公司',
          bankAccount: '利息收入户 10',
          fundType: '利息收入',
          expenditureType: '利息费用',
          amount: '45',
          isWorkFund: '否',
          isCapital: '',
          actionText: '查看',
          actionType: 'view'
        }
      ]
    }
  },
  methods: {
    handleSearch() {
      console.log('搜索', this.searchForm)
    },
    handleReset() {
      this.searchForm = {
        projectName: '',
        unitName: '',
        bankAccount: '',
        fundType: '',
        isWorkFund: '',
        isCapital: ''
      }
    }
  }
}
</script>

<style scoped>
.fund-usage {
  padding: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-bar {
  width: 4px;
  height: 18px;
  background: #409EFF;
  border-radius: 2px;
}

.title-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.back-btn {
  color: #666;
}

/* 统计卡片 */
.stat-cards {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.stat-card {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.card-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.blue-icon {
  background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
  color: #fff;
}

.green-icon {
  background: linear-gradient(135deg, #67C23A 0%, #85ce61 100%);
  color: #fff;
}

.orange-icon {
  background: linear-gradient(135deg, #E6A23C 0%, #ebb563 100%);
  color: #fff;
}

.card-title {
  font-size: 14px;
  color: #666;
}

.card-body {
  display: flex;
  align-items: flex-start;
}

.main-amount {
  min-width: 100px;
  border-right: 1px solid #eee;
  padding-right: 20px;
  margin-right: 20px;
}

.amount-value {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  display: block;
  line-height: 1.2;
}

.amount-label {
  font-size: 12px;
  color: #999;
}

.sub-amounts {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sub-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.sub-label {
  font-size: 13px;
  color: #666;
  min-width: 45px;
}

.sub-value {
  font-size: 16px;
  font-weight: 500;
}

.sub-value.blue {
  color: #409EFF;
}

.sub-value.green {
  color: #67C23A;
}

.sub-value.orange {
  color: #E6A23C;
}

/* 内容区域 */
.content-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.custom-tabs >>> .el-tabs__nav-wrap::after {
  display: none;
}

.custom-tabs >>> .el-tabs__item {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
}

.custom-tabs >>> .el-tabs__item.is-active {
  background: #409EFF;
  color: #fff;
  border-radius: 4px;
}

.custom-tabs >>> .el-tabs__active-bar {
  display: none;
}

/* 搜索表单 */
.search-form {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.form-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.form-inline >>> .el-form-item {
  margin-bottom: 12px;
  margin-right: 0;
}

.form-inline >>> .el-form-item__label {
  font-size: 13px;
  color: #666;
}

.form-inline >>> .el-input {
  width: 140px;
}

/* 操作按钮 */
.action-buttons {
  padding: 16px 0;
  display: flex;
  gap: 10px;
}

/* 数据表格 */
.data-table {
  font-size: 13px;
}

.data-table >>> .el-table__row {
  height: 48px;
}

.audit-btn {
  color: #409EFF !important;
}

.view-btn {
  color: #409EFF !important;
}
</style>
