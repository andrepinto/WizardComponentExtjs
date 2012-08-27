//Ext.ns('Ext.ux');
Ext.define('Ext.ux.Myplug', {

	extend: 'Ext.panel.Panel',

	config: {

		wzColor: '#EBEBEB',

		clockBgUrl: "ext/ux/my/images/bg-clock.png",

		label: "Andre",

		wizardDesc: [],

		nextText: 'next',

		previousText: 'previous',

		activePosi: 0

	},


	initComponent: function() {
		console.log('plug carregado');

		this.layout = new Ext.layout.container.Card(Ext.apply({
			owner: this,
			deferredRender: this.deferredRender,
			itemCls: this.itemCls,
			activeItem: this.activeTab
		}, this.layout));


		this.callParent();
	},

	afterRender: function() {

		var size = Math.min(this.getHeight(), this.getWidth());

		//CREATE PANEL WIZARD
		var panelSteps = Ext.create('Ext.Container', {
			width: this.getWidth(),
			style: {
				background: this.wzColor
			},
			height: 71,
			dock: 'top'
		});

		var wzLength = this.wizardDesc.length;
		var wzItems = [];

		htmlPanel = this.setWzHtml(wzLength, this.activePosi, this.wizardDesc);

		var tl = Ext.create('Ext.form.Label', {
			html: htmlPanel,
			itemId: 'lbWz'
		});


		wzItems[0] = tl;
		panelSteps.items.items = wzItems;


		//END CREATE PANEL WIZARD
		var btNext = Ext.create('Ext.Button', {
			text: this.nextText,
			handler: function(btn) {
				var panel = btn.up("panel");
				panel.setNext(btn.up("panel"));
			}
		});

		var sp = Ext.create('Ext.toolbar.Spacer', {
			flex: 1
		});

		var btPrevious = Ext.create('Ext.Button', {
			text: this.previousText,
			handler: function(btn) {
				var panel = btn.up("panel");
				panel.setPrevious(panel);
			}
		});



		var panelNav = Ext.create('Ext.toolbar.Toolbar', {
			width: this.getWidth(),
			height: 30,
			dock: 'bottom'
		});

		panelNav.insert(panelNav.items.length + 1, btPrevious);
		panelNav.insert(panelNav.items.length + 1, sp);
		panelNav.insert(panelNav.items.length + 1, btNext);


		this.addDocked([panelNav, panelSteps]);

		this.callParent();
	},



	setWzHtml: function(wzLength, activePosi, wizardDesc) {
		var htmlPanel = '<ul id="mainNav" class="fiveStep">';

		for (t = 0; t < wzLength; t++) {

			if (t == activePosi) {
				if ((t + 1) == wzLength) htmlPanel = htmlPanel + '<li class="mainNavNoBg current"><a title=""><em>' + wizardDesc[t].titel + '</em><span>' + wizardDesc[t].subTitel + '</span></a></li>';
				else htmlPanel = htmlPanel + '<li class="current"><a title=""><em>' + wizardDesc[t].titel + '</em><span>' + wizardDesc[t].subTitel + '</span></a></li>';
			} else if ((t + 1) == wzLength) htmlPanel = htmlPanel + '<li class="mainNavNoBg"><a title=""><em>' + wizardDesc[t].titel + '</em><span>' + wizardDesc[t].subTitel + '</span></a></li>';

			else if (t == (activePosi - 1)) htmlPanel = htmlPanel + '<li class="lastDone"><a title=""><em>' + wizardDesc[t].titel + '</em><span>' + wizardDesc[t].subTitel + '</span></a></li>';

			else if (t < activePosi) htmlPanel = htmlPanel + '<li class="done"><a title=""><em>' + wizardDesc[t].titel + '</em><span>' + wizardDesc[t].subTitel + '</span></a></li>';

			else {
				htmlPanel = htmlPanel + '<li><a title=""><em>' + wizardDesc[t].titel + '</em><span>' + wizardDesc[t].subTitel + '</span></a></li>';
			}

		}

		htmlPanel = htmlPanel + '</ul>';

		return htmlPanel;
	},


	setNext: function(panel) {

		var layout = panel.getLayout();
		var posi = panel.activePosi + 1;
		if (posi < panel.wizardDesc.length) {
			panel.setActivePosi(posi);
			var lb = Ext.ComponentQuery.query('#lbWz')[0];
			lb.destroy();

			htmlPanel = panel.setWzHtml(panel.wizardDesc.length, panel.activePosi, panel.wizardDesc);
			var tl = Ext.create('Ext.form.Label', {
				html: htmlPanel,
				itemId: 'lbWz'
			});

			var docked = panel.getDockedItems();
			var cp = tl;
			var wzItems = [];
			wzItems[0] = cp;
			docked[1].items.items = wzItems;

			layout["next"]();
		}



	},

	setPrevious: function(panel) {

		var layout = panel.getLayout();

		var posi = panel.getActivePosi() - 1;
		if (posi >= 0) {
			panel.setActivePosi(posi);

			var lb = Ext.ComponentQuery.query('#lbWz')[0];
			lb.destroy();

			htmlPanel = panel.setWzHtml(panel.wizardDesc.length, panel.activePosi, panel.wizardDesc);
			var tl = Ext.create('Ext.form.Label', {
				html: htmlPanel,
				itemId: 'lbWz'
			});

			var docked = panel.getDockedItems();
			var cp = tl;
			var wzItems = [];
			wzItems[0] = cp;
			docked[1].items.items = wzItems;

			layout["prev"]();
		}

	},

	onDestroy: function() {
		this.callParent();
	}



});