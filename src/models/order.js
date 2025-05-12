import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection.js';
import { User } from './user.js';
import { Inventory } from './inventory.js';

/**
 * 订单模型
 * 实现核心功能中的订单管理部分
 */
export const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '订单编号，格式：ORD-YYYYMMDD-XXXX',
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '客户ID',
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '客户名称',
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '订单总金额',
    },
    totalCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '总成本',
    },
    profit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '利润',
    },
    salesCommission: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      comment: '销售提成',
    },
    status: {
      type: DataTypes.ENUM(
        'pending', // 待审批
        'approved', // 已审批
        'shipping', // 发货中
        'completed', // 已完成
        'cancelled' // 已取消
      ),
      allowNull: false,
      defaultValue: 'pending',
      comment: '订单状态',
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '收货地址',
    },
    shippingMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '配送方式',
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '支付方式',
    },
    notes: {
      type: DataTypes.TEXT,
      comment: '订单备注',
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '创建者（业务员）ID',
    },
    approvedBy: {
      type: DataTypes.UUID,
      comment: '审批人ID',
    },
    approvedAt: {
      type: DataTypes.DATE,
      comment: '审批时间',
    },
    shippedAt: {
      type: DataTypes.DATE,
      comment: '发货时间',
    },
    completedAt: {
      type: DataTypes.DATE,
      comment: '完成时间',
    },
    trackingNumber: {
      type: DataTypes.STRING,
      comment: '物流追踪号',
    },
    mattermostMessageId: {
      type: DataTypes.STRING,
      comment: 'Mattermost消息ID，用于后续消息更新',
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
    // 创建索引以提高查询性能
    indexes: [
      {
        name: 'idx_order_number',
        fields: ['orderNumber'],
      },
      {
        name: 'idx_customer_id',
        fields: ['customerId'],
      },
      {
        name: 'idx_created_by',
        fields: ['createdBy'],
      },
      {
        name: 'idx_status',
        fields: ['status'],
      },
    ],
  }
);

// 订单项模型，关联到订单
export const OrderItem = sequelize.define(
  'OrderItem',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '订单ID',
    },
    inventoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '库存ID',
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '产品名称',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '数量',
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '单价',
    },
    unitCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '单位成本',
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '总价',
    },
    totalCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '总成本',
    },
    inventoryType: {
      type: DataTypes.ENUM('businessStaff', 'company', 'iceCenterIsland'),
      allowNull: false,
      comment: '库存类型：业务员货/公司货/冰中岛货',
    },
    commissionRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      comment: '提成比例',
    },
    commission: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '提成金额',
    },
  },
  {
    tableName: 'order_items',
    timestamps: true,
    indexes: [
      {
        name: 'idx_order_id',
        fields: ['orderId'],
      },
      {
        name: 'idx_inventory_id',
        fields: ['inventoryId'],
      },
    ],
  }
);

// 订单审批历史模型
export const OrderApproval = sequelize.define(
  'OrderApproval',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '订单ID',
    },
    approverId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '审批人ID',
    },
    approverName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '审批人姓名',
    },
    status: {
      type: DataTypes.ENUM('approved', 'rejected', 'pending'),
      allowNull: false,
      comment: '审批状态',
    },
    comments: {
      type: DataTypes.TEXT,
      comment: '审批意见',
    },
    mattermostMessageId: {
      type: DataTypes.STRING,
      comment: 'Mattermost消息ID',
    },
  },
  {
    tableName: 'order_approvals',
    timestamps: true,
    indexes: [
      {
        name: 'idx_approval_order_id',
        fields: ['orderId'],
      },
      {
        name: 'idx_approver_id',
        fields: ['approverId'],
      },
    ],
  }
);

// 设置模型关联关系

// 订单和订单项的一对多关系
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'items',
  onDelete: 'CASCADE',
});
OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

// 订单和审批历史的一对多关系
Order.hasMany(OrderApproval, {
  foreignKey: 'orderId',
  as: 'approvals',
  onDelete: 'CASCADE',
});
OrderApproval.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

// 用户和订单的关联
Order.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});
Order.belongsTo(User, {
  foreignKey: 'approvedBy',
  as: 'approver',
});

// 库存和订单项的关联
OrderItem.belongsTo(Inventory, {
  foreignKey: 'inventoryId',
  as: 'inventory',
});

export default { Order, OrderItem, OrderApproval };