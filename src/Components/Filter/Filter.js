import React, {Component} from 'react';

import {
  Query, Builder, BasicConfig, Utils as QbUtils,

} from "react-awesome-query-builder";
// For AntDesign widgets only:
import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
import merge from "lodash/merge";
 // or import "antd/dist/antd.css";
// For Material-UI widgets only:
import MaterialConfig from 'react-awesome-query-builder/lib/config/material';
// Choose your skin (ant/material/vanilla):
import './../../style/Anticon.css'
import "react-awesome-query-builder/lib/css/styles.css";

//optional, for more compact styles
AntdConfig.operators.is_empty.label = "Is Null"
AntdConfig.operators.is_empty.sqlOp = "IS NULL"
AntdConfig.operators.is_not_empty.label = "Is Not Null"
AntdConfig.operators.is_not_empty.sqlOp = "IS NOT NULL"
delete AntdConfig.operators.proximity 
const InitialConfig =AntdConfig; // or MaterialConfig or BasicConfig
// const {
//   operators: {
//       equal,
//       not_equal,
//       less,
//       less_or_equal,
//       greater,
//       greater_or_equal,
//       like,
//       not_like,
//       starts_with,
//       ends_with,
//       between,
//       not_between,
//       is_empty,
//       is_not_empty,
//       select_equals, // like `equal`, but for select
//       select_not_equals,
//       select_any_in,
//       select_not_any_in,
//       multiselect_equals, // like `equal`, but for multiselect
//       multiselect_not_equals,
//      // complex operator with options
//   },
//   widgets: {
//     text,
//     number,
//     slider,
//     rangeslider, // missing in `BasicConfig`
//     select,
//     multiselect,
//     treeselect, // missing in `BasicConfig` and in `MaterialConfig`
//     treemultiselect, // missing in `BasicConfig` and in `MaterialConfig`
//     date,
//     time,
//     datetime,
//     boolean,
//     field, // to compare field with another field of same type
//     func, // to compare field with result of function
//   },

//   settings
// } = AntdConfig;

// operators.is_empty.label = "Is Null";
// operators.is_not_empty.label = "Is Not Null";
// const conjunctions = {
//   AND: InitialConfig.conjunctions.AND,
//   OR: InitialConfig.conjunctions.OR,
// };


// const proximity= {
//   ...InitialConfig.operators.proximity,
//   valueLabels: [
//     { label: "Word 1", placeholder: "Enter first word" },
//     { label: "Word 2", placeholder: "Enter second word" },
//   ],
//   textSeparators: [
//     //'Word 1',
//     //'Word 2'
//   ],
//   options: {
//     ...InitialConfig.operators.proximity.options,
//     optionLabel: "Near", // label on top of "near" selectbox (for config.settings.showLabels==true)
//     optionTextBefore: "Near", // label before "near" selectbox (for config.settings.showLabels==false)
//     optionPlaceholder: "Select words between", // placeholder for "near" selectbox
//     minProximity: 2,
//     maxProximity: 10,
//     defaults: {
//       proximity: 2
//     },
//     customProps: {}
//   }
// };

// const operators= {
//   ...InitialConfig.operators,
//   // examples of  overriding
//   between: {
//     ...InitialConfig.operators.between,
//     valueLabels: [
//       "Value from",
//       "Value to"
//     ],
//     textSeparators: [
//       "from",
//       "to"
//     ],
//   },
//   proximity,
// };


// const widgets= {
//   ...InitialConfig.widgets,
//   // examples of  overriding
//   text: {
//     ...InitialConfig.widgets.text,
//     customProps: {
//       background:'red',
//     }
//   },
//   slider: {
//     ...InitialConfig.widgets.slider,
//     customProps: {
//       width: "300px"
//     }
//   },
//   rangeslider: {
//     ...InitialConfig.widgets.rangeslider,
//     customProps: {
//       width: "300px"
//     }
//   },
//   date: {
//     ...InitialConfig.widgets.date,
//     dateFormat: "DD.MM.YYYY",
//     valueFormat: "YYYY-MM-DD",
//   },
//   time: {
//     ...InitialConfig.widgets.time,
//     timeFormat: "HH:mm",
//     valueFormat: "HH:mm:ss",
//   },
//   datetime: {
//     ...InitialConfig.widgets.datetime,
//     timeFormat: "HH:mm",
//     dateFormat: "DD.MM.YYYY",
//     valueFormat: "YYYY-MM-DD HH:mm:ss",
//   },
//   func: {
//     ...InitialConfig.widgets.func,
//     customProps: {
//       showSearch: true
//     }
//   },
//   treeselect: {
//     ...InitialConfig.widgets.treeselect,
//     customProps: {
//       showSearch: true
//     }
//   },
// };


// const types = {
//   ...InitialConfig.types,
//   // examples of  overriding
//   boolean: merge(InitialConfig.types.boolean, {
//     widgets: {
//       boolean: {
//         widgetProps: {
//           hideOperator: true,
//           operatorInlineLabel: "is",
//         }
//       },
//     },
//   }),
// };


// const localeSettings= {
 
//   valueLabel: "Value",
//   valuePlaceholder: "Value",
//   fieldLabel: "Field",
//   operatorLabel: "Operator",
//   fieldPlaceholder: "Select field",
//   operatorPlaceholder: "Select operator",
//   deleteLabel: null,
//   addGroupLabel: "Add group",
//   addRuleLabel: "Add rule",
//   delGroupLabel: null,
//   notLabel: "Not",
//   valueSourcesPopupTitle: "Select value source",
//   removeRuleConfirmOptions: {
//     title: "Are you sure delete this rule?",
//     okText: "Yes",
//     okType: "danger",
//   },
//   removeGroupConfirmOptions: {
//     title: "Are you sure delete this group?",
//     okText: "Yes",
//     okType: "danger",
//   },
// };

// const settings = {
//   ...InitialConfig.settings,
//   ...localeSettings,

//   valueSourcesInfo: {
//     value: {
//       label: "Value",
     
//     },
//     field: {
//       label: "Field",
//       widget: "field",
//     },
//     func: {
//       label: "Function",
//       widget: "func",
//     }
//   },
//   // canReorder: false,
//   // canRegroup: false,
//   // showNot: false,
//   // showLabels: true,
//   maxNesting: 3,
//   canLeaveEmptyGroup: true, //after deletion
    
//   // renderField: (props) => <FieldCascader {...props} />,
//   // renderOperator: (props) => <FieldDropdown {...props} />,
//   // renderFunc: (props) => <FieldSelect {...props} />,
// };


const funcs = {
  LOWER: {
    label: "Lowercase",
    mongoFunc: "$toLower",
    jsonLogic: ({str}) => ({ "method": [ str, "toLowerCase" ] }),
    returnType: "text",
    args: {
      str: {
        label: "String",
        type: "text",
        valueSources: ["value"],
      },
    }
  },
  MONTH: {
    label: "Month",
    mongoFunc: "$Month",
    sqlFunc: 'MONTH',
    jsonLogic: ({str}) => ({ "method": [ str, "toLowerCase" ] }),
    returnType: "date",
    args: {
      str: {
        label: "String",
        type: "date",
        valueSources: ["value"],
      },
    }
  },
  DAY: {
    label: "Day",
    sqlFunc: 'DAY',
    returnType: "date",
    args: {
      str: {
        label: "String",
        type: "date",
        valueSources: ["value"],
      },
    }
  },
  YEAR: {
    label: "Year",
    mongoFunc: "$Month",
    sqlFunc: 'Year',
    jsonLogic: ({str}) => ({ "method": [ str, "toLowerCase" ] }),
    returnType: "date",
    args: {
      str: {
        label: "String",
        type: "date",
        valueSources: ["value"],
      },
    }
  },

};




// You need to provide your own config. See below 'Config format'
const config = {
  ...InitialConfig,
  
  funcs:funcs,
  fields: {
    qty: {
        label: 'Qty',
        type: 'number',
        fieldSettings: {
            min: 0,
        },
        valueSources: ['value'],
        preferWidgets: ['number'],
    },
    price: {
        label: 'Price',
        type: 'number',
        valueSources: ['value'],
        fieldSettings: {
            min: 10,
            max: 100,
        },
        preferWidgets: ['slider', 'rangeslider'],
    },
    color: {
        label: 'Color',
        type: 'select',
        valueSources: ['value'],
        fieldSettings: {
          listValues: [
            { value: 'yellow', title: 'Yellow' },
            { value: 'green', title: 'Green' },
            { value: 'orange', title: 'Orange' }
          ],
        }
    },
    is_promotion: {
        label: 'Promo?',
        type: 'boolean',
        operators: ['equal'],
        valueSources: ['value'],
    },
  }
};
// let fields = {
//   qty: {
//       label: 'Qty',
//       type: 'number',
//       fieldSettings: {
//           min: 0,
//       },
//       valueSources: ['value'],
//       preferWidgets: ['number'],
//   },
//   price: {
//       label: 'Price',
//       type: 'number',
//       valueSources: ['value'],
//       fieldSettings: {
//           min: 10,
//           max: 100,
//       },
//       preferWidgets: ['slider', 'rangeslider'],
//   },
//   color: {
//       label: 'Color',
//       type: 'select',
//       valueSources: ['value'],
//       fieldSettings: {
//         listValues: [
//           { value: 'yellow', title: 'Yellow' },
//           { value: 'green', title: 'Green' },
//           { value: 'orange', title: 'Orange' }
//         ],
//       }
//   },
//   is_promotion: {
//       label: 'Promo?',
//       type: 'boolean',
//       operators: ['equal'],
//       valueSources: ['value'],
//   },
// }
// const config= {
//   conjunctions,
//   operators,
//   widgets,
//   types,
//   settings,
//   fields,
//   funcs
// };
// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = {"id": QbUtils.uuid(), "type": "group"};


class DemoQueryBuilder extends Component {
    state = {
      tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
      config: config
    };
    componentWillMount(){
      let fieldss = {}
      for(const lala of this.props.data){
      
        fieldss[lala.fieldName]={
          label:lala.fieldDesc,
          type: 'text',
         
          valueSources: ['value'],
         
          
        } 
    

      }
      let hmm = this.state.config
      hmm.fields = fieldss
      if(this.props.filter){
        this.setState({
          ...this.state,
          tree: QbUtils.checkTree(QbUtils.loadTree(JSON.parse(this.props.filter[0].uiJson)), hmm),
          config:hmm
        })
      }else{
        this.setState({
          ...this.state,
          tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), hmm),
          config:hmm
        })

      }
    }
    
    render = () => (
      <div>
        <Query
            {...config} 
            value={this.state.tree}
            onChange={this.onChange}
            renderBuilder={this.renderBuilder}
        />
        {this.renderResult(this.state)}
      </div>
    )

    renderBuilder = (props) => (
      <div className="query-builder-container" style={{padding: '10px'}}>
        <div className="query-builder  ">
            <Builder {...props} />
        </div>
      </div>
    )

    renderResult = ({tree: immutableTree, config}) => (
      <div className="query-builder-result">
          {/* <div>Query string: <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre></div>
          <div>MongoDb query: <pre>{JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}</pre></div> */}
          {/* <div>JsonLogic: <pre>{JSON.stringify(QbUtils.jsonLogicFormat(immutableTree, config))}</pre></div>  */}
          
          
          
          <div>SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre></div>
      </div>
    )
    
    onChange = (immutableTree, config) => {
      // Tip: for better performance you can apply `throttle` - see `examples/demo`
      this.setState({tree: immutableTree, config: config});

      const jsonTree = QbUtils.getTree(immutableTree);
      this.props.onChange(jsonTree)
    
      // `jsonTree` can be saved to backend, and later loaded to `queryValue`
    }
}
export default DemoQueryBuilder