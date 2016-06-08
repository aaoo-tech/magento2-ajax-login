<?php
/**
 * Copyright © 2015 aaoo . All rights reserved.
 */
namespace aaoo\ajaxlogin\Block\Ajax;
use aaoo\ajaxlogin\Block\BaseBlock;
class Index extends BaseBlock
{
	public function getClass (){
		return $this->scopeConfig->getValue('ajaxconfig/parameters/login_class');
	}
}
