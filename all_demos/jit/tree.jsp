<%@ include file="../charset.jsp" %>
<%@ include file="../mo.jsp" %>
<%@ include file="../monitor/common.jsp" %>
<%@ taglib uri="/WEB-INF/ioss-common-taglib.tld" prefix="n" %>
<%
  String fdn = request.getParameter("fdn");
  String width = request.getParameter("width");
  if (width == null) { width = "100%"; }
%>
<style>
  #infovis {
    position:relative;
    width:<%=width%>;
    margin:2px;
    overflow: hidden;
  }
</style>
<script>
  var BizViewNodeHeight = 25;
  var BizViewNodeWidth = 210;
  var BizViewTreeTimeout;
  var BizClickTimer;
  var dataLink = "jsp/bizview/data.jsp?fdn=<%=fdn%>";
  var st, labelType, useGradients, nativeTextSupport, animate;
  var sevClasses = { };
  sevClasses['0'] = 'critical';
  sevClasses['1'] = 'major';
  sevClasses['2'] = 'minor';
  sevClasses['3'] = 'warning';
  sevClasses['88'] = 'normal';
  sevClasses['87'] = 'disabled';
  sevClasses['99'] = 'disabled';
  sevClasses['10000'] = 'disabled';

  $(document).ready(function() {
    setupTree();
    BizViewTreeTimeout = setTimeout(refreshTree, 20000);
  });

  function doubleClickNodeLabel(node, moclass, fdn)
  {
    clearTimeout(BizClickTimer);
    //window.location.hash = '#monitor/status/m_list/0/fdn='+fdn;
    showMOStatusDialog(fdn, '<n:msg k="Monitor status"/>');
    return false;
  }

  function clickNodeLabel(node, moclass, fdn)
  {
    if (BizClickTimer) clearTimeout(BizClickTimer);
    BizClickTimer = setTimeout(function() { singleClickNodeLabel(node, moclass, fdn); }, 150);
  }

  function singleClickNodeLabel(node, moclass, fdn)
  {
    if (moclass != 'ServiceDependency' && moclass != 'Service' && moclass != 'Business') {
      url = 'jsp/bizview/status.jsp?fdn='+fdn;
    }
    if (moclass != 'MonitorGroup') {
      id = $(node).parent().attr('id');
      localStorage.setItem('biz_view_iitem_clicked<%=fdn%>', id);
      st.onClick(id);
    }
  }

  function refreshTree()
  {
    if (BizViewTreeTimeout) { clearTimeout(BizViewTreeTimeout); }
    if (!($('#infovis').is(":visible"))) { return; }
    $('#bizview_tree_heading').html('Loading data...');
    var start = new Date();
    $.getJSON(dataLink, function(data) {
      var end = new Date();
      $('#bizview_tree_heading').html('Loaded data in '+(end.getTime()-start.getTime())+'ms');
      var org = st.clickedNode.id;
      st.loadJSON(data);
      st.compute();
      st.refresh();
    });
    BizViewTreeTimeout = setTimeout(refreshTree, 20000);
  }

  function setupTree()
  {
    var ua = navigator.userAgent,
    iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
    typeOfCanvas = typeof HTMLCanvasElement,
    nativeCanvasSupport=(typeOfCanvas=='object'||typeOfCanvas=='function'),
    textSupport = nativeCanvasSupport &&
      (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
    //setting this based on the fact that ExCanvas provides text support for IE
    //and that as of today iPhone/iPad current text support is lame
    labelType=(!nativeCanvasSupport||(textSupport && !iStuff))?'Native':'HTML';
    nativeTextSupport = labelType == 'Native';
    useGradients = nativeCanvasSupport;
    animate = !(iStuff || !nativeCanvasSupport);
    $('#bizview_tree_heading').html('Loading data...');
    var start = new Date();
    $.getJSON(dataLink, function(data) {
      var end = new Date();
      $('#bizview_tree_heading').html('Loaded data in '+((end.getTime()-start.getTime())/1000)+'s');
      var pc = $("#tmpbiz").val();
      if (pc=="<%=fdn%>") { initTreeWithData(data); }
    });
  }

  function initTreeWithData(viewData)
  {
    var start = new Date();
    var adjust = 215;
    $('#infovis').height($(window).height()-adjust);
    $('#settings_panel').css('left', '20px');
    $('#settings_panel').css('top', ($(window).height()-100)+'px');
    $('#settings_panel').show();

    st = new $jit.ST({
    injectInto: 'infovis',
    duration: 100,
    transition: $jit.Trans.Quart.easeInOut,
    multitree: false,
    levelDistance: 15,
    subtreeOffset: 20,
    siblingOffset: 10,
    indent:5,
    orientation: 'left',
      width: $('#infovis').width(),
      height: $('#infovis').height(),
      Navigation: { enable:true, zooming:false, panning:true },
      Node: { overridable: true, width: BizViewNodeWidth, height: BizViewNodeHeight, type: 'rectangle', color: '#aaa' },
      Edge: { overridable: true, type: 'bezier', color: 'red' /*$('.biz_div').css('border-color')*/ },
      onBeforeCompute: function(node) { },
      onAfterCompute: function() { },
      onCreateLabel: function(label, node) {
      label.id = node.id;
        moclass = node.data['moclass'];
        mofdn = node.data['fdn'];
        var iconTag = 'icon-stethoscope';
        if (moclass == 'Business') { iconTag = 'icon-cogs'; }
        if (moclass == 'Service') { iconTag = 'icon-cogs'; }
        if (moclass == 'ServiceDependency') { iconTag = 'icon-cog'; }
        if (moclass == 'MonitorGroup') { iconTag = 'icon-tags'; }	
        label.style.width = BizViewNodeWidth + 'px';
        label.style.height = BizViewNodeHeight + 'px';
        label.style.fontSize = '11px';
        label.style.textAlign= 'left';
        label.style.paddingTop = '5px';
        label.style.paddingLeft = '5px';
        var params = { moclass: moclass, fdn: mofdn, node: node, icon: iconTag }
        if (node.data.substatus == '1') { params.supportsSingleClick = true; }
        if (node.name.length > 20) { node.name = (node.name).substring(0, 19) + "..." }
        $(label).html(toHtml('#bizview-obj-tmpl', params));
      },
      onBeforePlotNode: function(node) {
        severity = node.data['severity'];
        var sevColor = $('#severity_template .normal').css('color');
        if (severity == '0') { sevColor = $('#severity_template .critical').css('color'); }
        else if (severity == '1') { sevColor = $('#severity_template .major').css('color'); }
        else if (severity == '2') { sevColor = $('#severity_template .minor').css('color'); }
        else if (severity == '3') { sevColor = $('#severity_template .warning').css('color'); }
        else if (severity == '87') { sevColor = $('#severity_template .disabled').css('color'); }
        else if (severity == '99') { sevColor = $('#severity_template .disabled').css('color'); }
        else if (severity == '10000') { sevColor = $('#severity_template .disabled').css('color'); }
        node.data.$color = sevColor;
        if (node.selected) { jitBorderColor = $('#bizview_template .border_selected').css('border-color'); }
        else { jitBorderColor = $('#bizview_template .border').css('border-color'); }
      },

      onBeforePlotLine: function(adj) {
        adj.data.$color = "#bbb";
        if (adj.nodeFrom.selected && adj.nodeTo.selected) { adj.data.$lineWidth = 1; } else { adj.data.$lineWidth = 1; }
      },

      Events: { enable: true, onRightClick: function(node, eventInfo, e) { } }
    });

    st.loadJSON(viewData);
    st.compute();
    var oldId = localStorage.getItem('biz_view_iitem_clicked<%=fdn%>');
    if (oldId) { try { st.onClick(oldId); } catch (err) { st.onClick(st.root); } }
    else { setTimeout(function() { st.onClick(st.root); }, 100); }

    var top = $jit.id('r-top'),
        left = $jit.id('r-left'),
        bottom = $jit.id('r-bottom'),
        right = $jit.id('r-right');

    function changeHandler()
    {
      if (this.checked) {
        top.disabled=bottom.disabled=right.disabled=left.disabled=true;
        st.switchPosition(this.value, "animate", {
          onComplete: function() { top.disabled=bottom.disabled=right.disabled=left.disabled=false; }
        });
      }
    };

    top.onchange=left.onchange=bottom.onchange=right.onchange=changeHandler;
    var end = new Date();
    $('#bizview_tree_heading').append('. Rendered in '+((end.getTime()-start.getTime())/1000)+'s');
  }
</script>
<div id="bizview_tree_heading" style="float:right;margin-top:-5px;font-size:0.8em;" />
<div style="clear:both;" />
<div id="infovis" style="background:none;border-radius:10px;border:1px dotted #D8D8D8;"></div>
<div style="position:relative;font-size:0.8em;">
    <n:msg k="Orientation" />:&nbsp;
    <label style="padding:10px;">
      <input type="radio" id="r-top" name="orientation" value="top" /><n:msg k="MENU_Up" />
    </label>
    <label style="padding:10px;">
      <input type="radio" id="r-bottom" name="orientation" value="bottom" /><n:msg k="MENU_Down" />
    </label>
    <label style="padding:10px;">
      <input type="radio" id="r-left" checked name="orientation" value="left" /><n:msg k="Left" />
    </label>
    <label style="padding:10px;">
      <input type="radio" id="r-right" name="orientation" value="right" /><n:msg k="Right" />
    </label>
</div>
<div id="bizview_template" style="display:none;">
  <div class="border" />
  <div class="border_selected" />
</div>
<script id="bizview-obj-tmpl" type="text/html">
  <span class="bizview_label ngnoselect autosubstr"
    style="margin-top:-2px;vertical-align:middle;color:white;background:none;line-height:10px;display:inline-block;"
    {{#if supportsSingleClick}} onclick="clickNodeLabel(this, '{{moclass}}', '{{node.id}}')" {{/if}}
    ondblclick="doubleClickNodeLabel(this, '{{moclass}}', '{{fdn}}')">
    <span style="display:inline-block;width:17px;">
      <i class="{{icon}}" style="width:50px;font-size:1.2em;color:#fff;padding-top:15px;padding-right:5px;" />
    </span>
      {{node.name}}
	</span>
</script>
