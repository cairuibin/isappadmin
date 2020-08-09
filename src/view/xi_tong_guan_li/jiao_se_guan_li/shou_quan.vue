<template>
    <Tabs type="card" :draggable="true" @on-drag-drop="handleDragDrop">
        <TabPane v-for="(tab, index) in tabList" :key="index" :label="tab.label" :name="tab.name">
             <Tree :data="data4" show-checkbox multiple></Tree>
        </TabPane>
    </Tabs>
</template>
<script>
    export default {
        data () {
            return {
                tabList: [
                    {
                        label: '首页',
                        name: 'name1'
                    },
                    {
                        label: '运营管理',
                        name: 'name2'
                    },
                    {
                        label: '用户管理',
                        name: 'name3'
                    },
                    {
                        label: '商城管理',
                        name: 'name4'
                    },
                    {
                        label: '内容管理',
                        name: 'name5'
                    },
                     {
                        label: '工具管理',
                        name: 'name6'
                    }, {
                        label: '财务管理',
                        name: 'name7'
                    }, {
                        label: '系统管理',
                        name: 'name8'
                    }
                ],
                data4: [
                    {
                        title: 'parent 1',
                        expand: true,
                        selected: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        disabled: true
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        checked: true
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            handleDragDrop (name, newName, a, b, names) {
                // names 为调整后的 name 集合
                this.tabList.splice(b,1,...this.tabList.splice(a, 1 , this.tabList[b]));
            }
        }
    }
</script>
