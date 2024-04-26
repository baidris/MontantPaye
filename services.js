const initMondayClient = require('monday-sdk-js');

const getColumnValue = async (token, itemId, columnId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($itemId: [ID!], $columnId: [String!]) {
        items (ids: $itemId) {
          column_values(ids:$columnId) {
            text
          }
        }
      }`;
    const variables = { columnId, itemId };

    const response = await mondayClient.api(query, { variables });
    console.log("its okay !!" , response.data.items[0].column_values[0].text)
    return response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};

const changeColumnValue = async (token, boardId, itemId, columnId, value) => {
  try {
    const mondayClient = initMondayClient({ token });
    //const query  = `mutation {change_simple_column_value(board_id:1382994588,item_id:1439824129,column_id:"texte",value:"Data Magician!"){id}}`
     //const query  = `mutation {change_simple_column_value(board_id:${boardId},item_id:${itemId},column_id:${columnId},value:${value}){id}}`
     const query = `mutation change_column_value($boardId: ID!, $itemId: ID!,$columnId: String! ,$value: String!){change_simple_column_value(item_id: $itemId  column_id:$columnId value: $value  board_id: $boardId) { id}}
      `;
     
    const variables = { boardId, columnId, itemId, value };
     const response = await mondayClient.api(query,{variables});
     console.log("okk")
    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getColumnValue,
  changeColumnValue,
};
