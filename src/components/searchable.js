import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, } from 'react-native';
import { Colors } from '../config';
import SearchableDropdown from 'react-native-searchable-dropdown';

const items = [ 
  {id: 1, name: 'Afghanistan', code: 'AF'}, 
  {id: 2,name: 'Åland Islands', code: 'AX'}, 
  {id: 3,name: 'Albania', code: 'AL'}, 
  {id: 4,name: 'Algeria', code: 'DZ'}, 
  {id: 5,name: 'American Samoa', code: 'AS'}, 
  {id: 6,name: 'AndorrA', code: 'AD'}, 
  {id: 7,name: 'Angola', code: 'AO'}, 
  {id: 8,name: 'Anguilla', code: 'AI'}, 
  {id: 9,name: 'Antarctica', code: 'AQ'}, 
  {id: 10,name: 'Antigua and Barbuda', code: 'AG'}, 
  {id: 11,name: 'Argentina', code: 'AR'}, 
  {id: 12,name: 'Armenia', code: 'AM'}, 
  {id: 13,name: 'Aruba', code: 'AW'}, 
  {id: 14,name: 'Australia', code: 'AU'}, 
  {id: 15,name: 'Austria', code: 'AT'}, 
  {id: 16,name: 'Azerbaijan', code: 'AZ'}, 
  {id: 17,name: 'Bahamas', code: 'BS'}, 
  {id: 18,name: 'Bahrain', code: 'BH'}, 
  {id: 19,name: 'Bangladesh', code: 'BD'}, 
  {id: 21,name: 'Barbados', code: 'BB'}, 
  {id: 22,name: 'Belarus', code: 'BY'}, 
  {id: 23,name: 'Belgium', code: 'BE'}, 
  {id: 24,name: 'Belize', code: 'BZ'}, 
  {id: 25,name: 'Benin', code: 'BJ'}, 
  {id: 26,name: 'Bermuda', code: 'BM'}, 
  {id: 27,name: 'Bhutan', code: 'BT'}, 
  {id: 28,name: 'Bolivia', code: 'BO'}, 
  {id: 29,name: 'Bosnia and Herzegovina', code: 'BA'}, 
  {id: 30,name: 'Botswana', code: 'BW'}, 
  {id: 31,name: 'Bouvet Island', code: 'BV'}, 
  {id: 32,name: 'Brazil', code: 'BR'}, 
  {id: 33,name: 'British Indian Ocean Territory', code: 'IO'}, 
  {id: 34,name: 'Brunei Darussalam', code: 'BN'}, 
  {id: 35,name: 'Bulgaria', code: 'BG'}, 
  {id: 36,name: 'Burkina Faso', code: 'BF'}, 
  {id: 37,name: 'Burundi', code: 'BI'}, 
  {id: 38,name: 'Cambodia', code: 'KH'}, 
  {id: 39,name: 'Cameroon', code: 'CM'}, 
  {id: 40,name: 'Canada', code: 'CA'}, 
  {id: 41,name: 'Cape Verde', code: 'CV'}, 
  {id: 42,name: 'Cayman Islands', code: 'KY'}, 
  {id: 43,name: 'Central African Republic', code: 'CF'}, 
  {id: 44,name: 'Chad', code: 'TD'}, 
  {id: 45,name: 'Chile', code: 'CL'}, 
  {id: 46,name: 'China', code: 'CN'}, 
  {id: 47,name: 'Christmas Island', code: 'CX'}, 
  {id: 48,name: 'Cocos (Keeling) Islands', code: 'CC'}, 
  {id: 49,name: 'Colombia', code: 'CO'}, 
  {id: 50,name: 'Comoros', code: 'KM'}, 
  {id: 51,name: 'Congo', code: 'CG'}, 
  {id: 52,name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
  {id: 52,name: 'Cook Islands', code: 'CK'}, 
  {id: 53,name: 'Costa Rica', code: 'CR'}, 
  {id: 54,name: 'Cote D\'Ivoire', code: 'CI'}, 
  {id: 55,name: 'Croatia', code: 'HR'}, 
  {id: 56,name: 'Cuba', code: 'CU'}, 
  {id: 57,name: 'Cyprus', code: 'CY'}, 
  {id: 58,name: 'Czech Republic', code: 'CZ'}, 
  {id: 59,name: 'Denmark', code: 'DK'}, 
  {id: 60,name: 'Djibouti', code: 'DJ'}, 
  {id: 61,name: 'Dominica', code: 'DM'}, 
  {id: 62,name: 'Dominican Republic', code: 'DO'}, 
  {id: 63,name: 'Ecuador', code: 'EC'}, 
  {id: 64,name: 'Egypt', code: 'EG'}, 
  {id: 65,name: 'El Salvador', code: 'SV'}, 
  {id: 66,name: 'Equatorial Guinea', code: 'GQ'}, 
  {id: 67,name: 'Eritrea', code: 'ER'}, 
  {id: 68,name: 'Estonia', code: 'EE'}, 
  {id: 69,name: 'Ethiopia', code: 'ET'}, 
  {id: 70,name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
  {id: 71,name: 'Faroe Islands', code: 'FO'}, 
  {id: 72,name: 'Fiji', code: 'FJ'}, 
  {id: 73,name: 'Finland', code: 'FI'}, 
  {id: 74,name: 'France', code: 'FR'}, 
  {id: 75,name: 'French Guiana', code: 'GF'}, 
  {id: 76,name: 'French Polynesia', code: 'PF'}, 
  {id: 77,name: 'French Southern Territories', code: 'TF'}, 
  {id: 78,name: 'Gabon', code: 'GA'}, 
  {id: 79,name: 'Gambia', code: 'GM'}, 
  {id: 80,name: 'Georgia', code: 'GE'}, 
  {id: 81,name: 'Germany', code: 'DE'}, 
  {id: 82,name: 'Ghana', code: 'GH'}, 
  {id: 83,name: 'Gibraltar', code: 'GI'}, 
  {id: 84,name: 'Greece', code: 'GR'}, 
  {id: 85,name: 'Greenland', code: 'GL'}, 
  {id: 86,name: 'Grenada', code: 'GD'}, 
  {id: 87,name: 'Guadeloupe', code: 'GP'}, 
  {id: 88,name: 'Guam', code: 'GU'}, 
  {id: 89,name: 'Guatemala', code: 'GT'}, 
  {id: 90,name: 'Guernsey', code: 'GG'}, 
  {id: 91,name: 'Guinea', code: 'GN'}, 
  {id: 92,name: 'Guinea-Bissau', code: 'GW'}, 
  {id: 93,name: 'Guyana', code: 'GY'}, 
  {id: 94,name: 'Haiti', code: 'HT'}, 
  {id: 95,name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
  {id: 96,name: 'Holy See (Vatican City State)', code: 'VA'}, 
  {id: 97,name: 'Honduras', code: 'HN'}, 
  {id: 98,name: 'Hong Kong', code: 'HK'}, 
  {id: 99,name: 'Hungary', code: 'HU'}, 
  {id: 100,name: 'Iceland', code: 'IS'}, 
  {id: 101,name: 'India', code: 'IN'}, 
  {id: 102,name: 'Indonesia', code: 'ID'}, 
  {id: 103,name: 'Iran, Islamic Republic Of', code: 'IR'}, 
  {id: 104,name: 'Iraq', code: 'IQ'}, 
  {id: 105,name: 'Ireland', code: 'IE'}, 
  {id: 106,name: 'Isle of Man', code: 'IM'}, 
  {id: 107,name: 'Israel', code: 'IL'}, 
  {id: 108,name: 'Italy', code: 'IT'}, 
  {id: 109,name: 'Jamaica', code: 'JM'}, 
  {id: 110,name: 'Japan', code: 'JP'}, 
  {id: 111,name: 'Jersey', code: 'JE'}, 
  {id: 112,name: 'Jordan', code: 'JO'}, 
  {id: 113,name: 'Kazakhstan', code: 'KZ'}, 
  {id: 114,name: 'Kenya', code: 'KE'}, 
  {id: 115,name: 'Kiribati', code: 'KI'}, 
  {id: 116,name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
  {id: 117,name: 'Korea, Republic of', code: 'KR'}, 
  {id: 118,name: 'Kuwait', code: 'KW'}, 
  {id: 119,name: 'Kyrgyzstan', code: 'KG'}, 
  {id: 120,name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
  {id: 121,name: 'Latvia', code: 'LV'}, 
  {id: 122,name: 'Lebanon', code: 'LB'}, 
  {id: 123,name: 'Lesotho', code: 'LS'}, 
  {id: 124,name: 'Liberia', code: 'LR'}, 
  {id: 125,name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
  {id: 127,name: 'Liechtenstein', code: 'LI'}, 
  {id: 128,name: 'Lithuania', code: 'LT'}, 
  {id: 129,name: 'Luxembourg', code: 'LU'}, 
  {id: 130,name: 'Macao', code: 'MO'}, 
  {id: 131,name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
  {id: 132,name: 'Madagascar', code: 'MG'}, 
  {id: 133,name: 'Malawi', code: 'MW'}, 
  {id: 134,name: 'Malaysia', code: 'MY'}, 
  {id: 135,name: 'Maldives', code: 'MV'}, 
  {id: 136,name: 'Mali', code: 'ML'}, 
  {id: 137,name: 'Malta', code: 'MT'}, 
  {id: 138,name: 'Marshall Islands', code: 'MH'}, 
  {id: 139,name: 'Martinique', code: 'MQ'}, 
  {id: 140,name: 'Mauritania', code: 'MR'}, 
  {id: 141,name: 'Mauritius', code: 'MU'}, 
  {id: 142,name: 'Mayotte', code: 'YT'}, 
  {id: 143,name: 'Mexico', code: 'MX'}, 
  {id: 144,name: 'Micronesia, Federated States of', code: 'FM'}, 
  {id: 145,name: 'Moldova, Republic of', code: 'MD'}, 
  {id: 146,name: 'Monaco', code: 'MC'}, 
  {id: 147,name: 'Mongolia', code: 'MN'}, 
  {id: 148,name: 'Montserrat', code: 'MS'}, 
  {id: 149,name: 'Morocco', code: 'MA'}, 
  {id: 150,name: 'Mozambique', code: 'MZ'}, 
  {id: 151,name: 'Myanmar', code: 'MM'}, 
  {id: 152,name: 'Namibia', code: 'NA'}, 
  {id: 153,name: 'Nauru', code: 'NR'}, 
  {id: 153,name: 'Nepal', code: 'NP'}, 
  {id: 154,name: 'Netherlands', code: 'NL'}, 
  {id: 155,name: 'Netherlands Antilles', code: 'AN'}, 
  {id: 156,name: 'New Caledonia', code: 'NC'}, 
  {id: 157,name: 'New Zealand', code: 'NZ'}, 
  {id: 158,name: 'Nicaragua', code: 'NI'}, 
  {id: 159,name: 'Niger', code: 'NE'}, 
  {id: 160,name: 'Nigeria', code: 'NG'}, 
  {id: 161,name: 'Niue', code: 'NU'}, 
  {id: 162,name: 'Norfolk Island', code: 'NF'}, 
  {id: 163,name: 'Northern Mariana Islands', code: 'MP'}, 
  {id: 164,name: 'Norway', code: 'NO'}, 
  {id: 165,name: 'Oman', code: 'OM'}, 
  {id: 166,name: 'Pakistan', code: 'PK'}, 
  {id: 167,name: 'Palau', code: 'PW'}, 
  {id: 168,name: 'Palestinian Territory, Occupied', code: 'PS'}, 
  {id: 169,name: 'Panama', code: 'PA'}, 
  {id: 170,name: 'Papua New Guinea', code: 'PG'}, 
  {id: 171,name: 'Paraguay', code: 'PY'}, 
  {id: 172,name: 'Peru', code: 'PE'}, 
  {id: 173,name: 'Philippines', code: 'PH'}, 
  {id: 174,name: 'Pitcairn', code: 'PN'}, 
  {id: 175,name: 'Poland', code: 'PL'}, 
  {id: 176,name: 'Portugal', code: 'PT'}, 
  {id: 177,name: 'Puerto Rico', code: 'PR'}, 
  {id: 178,name: 'Qatar', code: 'QA'}, 
  {id: 179,name: 'Reunion', code: 'RE'}, 
  {id: 180,name: 'Romania', code: 'RO'}, 
  {id: 181,name: 'Russian Federation', code: 'RU'}, 
  {id: 182,name: 'RWANDA', code: 'RW'}, 
  {id: 183,name: 'Saint Helena', code: 'SH'}, 
  {id: 184,name: 'Saint Kitts and Nevis', code: 'KN'}, 
  {id: 185,name: 'Saint Lucia', code: 'LC'}, 
  {id: 186,name: 'Saint Pierre and Miquelon', code: 'PM'}, 
  {id: 187,name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
  {id: 188,name: 'Samoa', code: 'WS'}, 
  {id: 189,name: 'San Marino', code: 'SM'}, 
  {id: 190,name: 'Sao Tome and Principe', code: 'ST'}, 
  {id: 191,name: 'Saudi Arabia', code: 'SA'}, 
  {id: 192,name: 'Senegal', code: 'SN'}, 
  {id: 193,name: 'Serbia and Montenegro', code: 'CS'}, 
  {id: 194,name: 'Seychelles', code: 'SC'}, 
  {id: 195,name: 'Sierra Leone', code: 'SL'}, 
  {id: 196,name: 'Singapore', code: 'SG'}, 
  {id: 197,name: 'Slovakia', code: 'SK'}, 
  {id: 198,name: 'Slovenia', code: 'SI'}, 
  {id: 199,name: 'Solomon Islands', code: 'SB'}, 
  {id: 200,name: 'Somalia', code: 'SO'}, 
  {id: 201,name: 'South Africa', code: 'ZA'}, 
  {id: 202,name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
  {id: 203,name: 'Spain', code: 'ES'}, 
  {id: 204,name: 'Sri Lanka', code: 'LK'}, 
  {id: 205,name: 'Sudan', code: 'SD'}, 
  {id: 206,name: 'Suriname', code: 'SR'}, 
  {id: 207,name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
  {id: 208,name: 'Swaziland', code: 'SZ'}, 
  {id: 209,name: 'Sweden', code: 'SE'}, 
  {id: 210,name: 'Switzerland', code: 'CH'}, 
  {id: 211,name: 'Syrian Arab Republic', code: 'SY'}, 
  {id: 212,name: 'Taiwan, Province of China', code: 'TW'}, 
  {id: 213,name: 'Tajikistan', code: 'TJ'}, 
  {id: 214,name: 'Tanzania, United Republic of', code: 'TZ'}, 
  {id: 215,name: 'Thailand', code: 'TH'}, 
  {id: 216,name: 'Timor-Leste', code: 'TL'}, 
  {id: 217,name: 'Togo', code: 'TG'}, 
  {id: 218,name: 'Tokelau', code: 'TK'}, 
  {id: 219,name: 'Tonga', code: 'TO'}, 
  {id: 220,name: 'Trinidad and Tobago', code: 'TT'}, 
  {id: 221,name: 'Tunisia', code: 'TN'}, 
  {id: 222,name: 'Turkey', code: 'TR'}, 
  {id: 223,name: 'Turkmenistan', code: 'TM'}, 
  {id: 224,name: 'Turks and Caicos Islands', code: 'TC'}, 
  {id: 225,name: 'Tuvalu', code: 'TV'}, 
  {id: 226,name: 'Uganda', code: 'UG'}, 
  {id: 227,name: 'Ukraine', code: 'UA'}, 
  {id: 228,name: 'United Arab Emirates', code: 'AE'}, 
  {id: 229,name: 'United Kingdom', code: 'GB'}, 
  {id: 230,name: 'United States', code: 'US'}, 
  {id: 231,name: 'United States Minor Outlying Islands', code: 'UM'}, 
  {id: 232,name: 'Uruguay', code: 'UY'}, 
  {id: 233,name: 'Uzbekistan', code: 'UZ'}, 
  {id: 234,name: 'Vanuatu', code: 'VU'}, 
  {id: 235,name: 'Venezuela', code: 'VE'}, 
  {id: 236,name: 'Viet Nam', code: 'VN'}, 
  {id: 237,name: 'Virgin Islands, British', code: 'VG'}, 
  {id: 238,name: 'Virgin Islands, U.S.', code: 'VI'}, 
  {id: 239,name: 'Wallis and Futuna', code: 'WF'}, 
  {id: 240,name: 'Western Sahara', code: 'EH'}, 
  {id: 241,name: 'Yemen', code: 'YE'}, 
  {id: 242,name: 'Zambia', code: 'ZM'}, 
  {id: 243,name: 'Zimbabwe', code: 'ZW'} 
]

const MyMdl = ({ isVisible, onClose , setLocation }) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [textInputEditable, setTextInputEditable] = useState(true);

  const handleItemSelect = (item) => {
    setSelectedItems([...selectedItems, item]);
    setTextInputEditable(false);
    setLocation(item)
  };
console.log('jjjj',selectedItems)
  const handleItemRemove = (item, index) => {
    setSelectedItems(selectedItems.filter((sitem) => sitem.id !== item.id));
    setTextInputEditable(true);
  };
  return (
    <Modal visible={isVisible} animationType="slide">

      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Select Location</Text>
        </View>
        <SearchableDropdown
          multi
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
          onRemoveItem={handleItemRemove}
          containerStyle={{ padding: 5 }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: 'purple',
            borderColor: '#bbb',
            borderWidth: 1,
            width: '95%',
            alignSelf: 'center',
            height: 40,
            borderRadius: 11,

          }}
          itemTextStyle={{ color: '#ffff' }}
          itemsContainerStyle={{ maxHeight: 300, marginTop: 10 }}
          items={items}
          chip
          resetValue={true}
          textInputProps={{
            placeholder: 'Select Location',
            underlineColorAndroid: 'transparent',
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 15,
              width: '95%',
              alignSelf: 'center',
              marginTop: 10
            },
            editable: textInputEditable,
          }}
          listProps={{ nestedScrollEnabled: true }}
        />
        {/* Single */}
  
     
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>{textInputEditable == false ? 'Done' : 'Close'}</Text>
        </TouchableOpacity>
  
      </View>
    </Modal>
  );
};
export default React.memo(MyMdl)

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#ffff',
    flex: 1
  },
  modalHeader: {
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginTop: 20
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black
  },
  modalBody: {
    padding: 20,
    alignSelf: 'stretch',
  },
  modalBodyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Colors.purple,
    padding: 10,
    borderRadius: 5,
    top: 80,
    alignSelf: 'center',
    width: '80%',
    height: 60,
    justifyContent: 'center',
    borderRadius: 20
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,

  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  textInput: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    width: '90%',

  },
  flatList: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    maxHeight: 200,

  },
  itemContainer: {
    padding: 10,

  },
  itemText: {
    fontSize: 16,
    color: Colors.black,
  },

});