const docSetupUpload = (fileCodedBase64: any, fileName: string) => {
    return `
    <?xml version="1.0" encoding="windows-1252"?>
    <request type="POST">
    <paths count="0"/>
    <values count="4">
    <file>
    ${fileCodedBase64}
    </file>
    <file_name>
    ${fileName}
    </file_name>
    <ip_address>::1</ip_address>
    <user_email>waechterb@fr.objectiflune.com</user_email>
    </values>
    <files count="0"/>
    <header>
    <ipaddress>0:0:0:0:0:0:0:1</ipaddress>
    <reqheader>docsetup_upload</reqheader>
    <user-agent>WordPress/6.3.1; http://localhost</user-agent>
    <referer/>
    <COTG>0</COTG>
    <cookies/>
    </header>
    </request>

    `;
  }
  const getUploadedFile = (uuid: string) => {
    return `
    <?xml version="1.0" encoding="windows-1252"?>
    <request type="GET">
    <paths count="0"/>
    <values count="1">
    <uid>
      ${uuid}
    </uid>
    </values>
    <files count="0"/>
    <header>
    <ipaddress>0:0:0:0:0:0:0:1</ipaddress>
    <reqheader>get_uploaded_file</reqheader>
    <user-agent>WordPress/6.3.1; http://localhost</user-agent>
    <referer/>
    <COTG>0</COTG>
    <cookies/>
    </header>
    </request>

    `
  }

  const executeDynamic = (startX: number, endX: number, startY: number, endY: number) =>   {
    return `
    <?xml version="1.0" encoding="windows-1252"?>
    <request type="GET">
    <paths count="0"/>
    <values count="2">
    <params>
    {&quot;extract&quot;:&quot;&quot;,
      &quot;address&quot;:&quot;&quot;,
      &quot;boundaries&quot;:{
        &quot;type&quot;:&quot;on_text&quot;,
        &quot;settings&quot;:{
          &quot;operator&quot;:&quot;contains&quot;,
          &quot;str_search&quot;:&quot;Facture cpta&quot;,
          &quot;startx&quot;:&quot;${startX}&quot;,
          &quot;starty&quot;:&quot;${startY}&quot;,
          &quot;endx&quot;:&quot;${endX}&quot;,
          &quot;endy&quot;:&quot;${endY}&quot;,
          &quot;boundaries_offset&quot;:&quot;0&quot;
        }
      }
    }</params>
    <uid>010HLH8R1P33MBE</uid>
    </values>
    <files count="0"/>
    <header>
    <ipaddress>0:0:0:0:0:0:0:1</ipaddress>
    <reqheader>execute_dynamic_dm</reqheader>
    <user-agent>WordPress/6.3.1; http://localhost</user-agent>
    <referer/>
    <COTG>0</COTG>
    <cookies/>
    </header>
    </request>
    `

  }

  export {executeDynamic,docSetupUpload,getUploadedFile}