app.views.AddRound = Ext.extend(Ext.Panel, {
    dockedItems: [{
        xtype: 'toolbar',
        title: '本局輸贏',
        items: [{
            text: '取消',
            ui: 'back',
            listeners: {
                'tap': function () {
                    Ext.dispatch({
                        controller: app.controllers.main,
                        action: 'backFromAddRound',
                    });
                }
            }
        }, {
            xtype:'spacer'
        }, {
            text: '刪除',
            ui: 'action',
            listeners: {
                'tap': function () {
                    console.log('AddRound.js -> delete button dispatch | roundNum: ' + this.up('panel').roundNum);
                    // confirm?
                    Ext.Msg.confirm(
                        '注意',
                        '刪除該牌局記錄。確定刪除？',
                        function(btn) {
                            if(btn == 'yes') {
                                Ext.dispatch({
                                    controller: app.controllers.main,
                                    action: 'deleteRound',
                                    roundNum: this.up('panel').roundNum
                                });
                            }
                        },
                        this
                    );

                    
                }
            }
        }, {
            text: '保存',
            ui: 'action',
            listeners: {
                'tap': function () {
                    console.log('AddRound.js -> save button dispatch | roundNum: ' + this.up('panel').roundNum);
                    Ext.dispatch({
                        controller: app.controllers.main,
                        action: 'addRound',
                        numOfCards: {
                            p1Num : this.up('panel').items.items[0].getValue(), 
                            p2Num : this.up('panel').items.items[1].getValue(),
                            p3Num : this.up('panel').items.items[2].getValue(),
                            p4Num : this.up('panel').items.items[3].getValue()                                
                        }, 
                        roundNum: this.up('panel').roundNum
                    });
                }
            }
        }]
    }],
    items: [{
        xtype: 'selectfield',
        name: 'p1Num', 
        label: 'p1',
        options: [{text:'0',value:'0'},{text:'1',value:'1'},{text:'2',value:'2'},
                  {text:'3',value:'3'},{text:'4',value:'4'},{text:'5',value:'5'},
                  {text:'6',value:'6'},{text:'7',value:'7'},{text:'8',value:'8'},
                  {text:'9',value:'9'},{text:'10',value:'10'},{text:'11',value:'11'},
                  {text:'12',value:'12'},{text:'13',value:'13'}]
    }, {
        xtype: 'selectfield',
        name: 'p2Num', 
        label: 'p2',
        options: [{text:'0',value:'0'},{text:'1',value:'1'},{text:'2',value:'2'},
                  {text:'3',value:'3'},{text:'4',value:'4'},{text:'5',value:'5'},
                  {text:'6',value:'6'},{text:'7',value:'7'},{text:'8',value:'8'},
                  {text:'9',value:'9'},{text:'10',value:'10'},{text:'11',value:'11'},
                  {text:'12',value:'12'},{text:'13',value:'13'}]
    }, {
        xtype: 'selectfield',
        name: 'p3Num', 
        label: 'p3',
        options: [{text:'0',value:'0'},{text:'1',value:'1'},{text:'2',value:'2'},
                  {text:'3',value:'3'},{text:'4',value:'4'},{text:'5',value:'5'},
                  {text:'6',value:'6'},{text:'7',value:'7'},{text:'8',value:'8'},
                  {text:'9',value:'9'},{text:'10',value:'10'},{text:'11',value:'11'},
                  {text:'12',value:'12'},{text:'13',value:'13'}]
    }, {
        xtype: 'selectfield',
        name: 'p4Num', 
        label: 'p4',
        options: [{text:'0',value:'0'},{text:'1',value:'1'},{text:'2',value:'2'},
                  {text:'3',value:'3'},{text:'4',value:'4'},{text:'5',value:'5'},
                  {text:'6',value:'6'},{text:'7',value:'7'},{text:'8',value:'8'},
                  {text:'9',value:'9'},{text:'10',value:'10'},{text:'11',value:'11'},
                  {text:'12',value:'12'},{text:'13',value:'13'}]
    }], 
    listeners: {
        'activate': function() {
            console.log('addRound.js -> activate');

            this.updateLabel = function(index, newText) {
                console.log('addRound.js -> activate | index: ' + index);
                this.items.items[index].labelEl.dom.children[0].innerHTML = newText;
            }; 

            this.updateNum = function(index, numOfCards) {
                this.items.items[index].setValue(numOfCards);
            }

            var names = app.stores.playerList; 
            this.updateLabel(0, names.data.items[0].data.p1);
            this.updateLabel(1, names.data.items[0].data.p2);
            this.updateLabel(2, names.data.items[0].data.p3);
            this.updateLabel(3, names.data.items[0].data.p4);
            if(!this.isAdd) {
                var round = app.stores.rounds.getAt(this.roundNum-1);
                this.updateNum(0, round.get('p1Num'));
                this.updateNum(1, round.get('p2Num'));
                this.updateNum(2, round.get('p3Num'));
                this.updateNum(3, round.get('p4Num'));
            }
            else {
                this.updateNum(0, 0);
                this.updateNum(1, 0);
                this.updateNum(2, 0);
                this.updateNum(3, 0);
            }
        }
    }, 
    getReady: function(roundNum) {
        console.log('AddRound.js -> getReady: ' + roundNum);
        this.roundNum = roundNum;
        // add or edit?
        if(roundNum > app.stores.rounds.getCount()) this.isAdd = true;
        else this.isAdd = false;
    }
});