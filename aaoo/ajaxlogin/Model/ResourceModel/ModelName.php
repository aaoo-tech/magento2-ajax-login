<?php
/**
 * Copyright © 2015 aaoo. All rights reserved.
 */
namespace aaoo\ajaxlogin\Model\ResourceModel;

/**
 * ModelName resource
 */
class ModelName extends \Magento\Framework\Model\ResourceModel\Db\AbstractDb
{
    /**
     * Initialize resource
     *
     * @return void
     */
    public function _construct()
    {
        $this->_init('ajaxlogin_modelname', 'id');
    }

  
}
