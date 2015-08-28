# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


{
    'name': 'Subscription Management',
    'version': '1.1',
    'category': 'Sales Management',
    'description': """
This module allows you to manage recurring invoicing of susbcriptions.
===================================================================================================================
""",
    'author': 'Camptocamp / Odoo',
    'depends': ['sale'],
    'data': [
        'security/account_analytic_analysis_security.xml',
        'security/ir.model.access.csv',
        'views/sale_contract_view.xml',
        'data/sale_contract_cron.xml',
        'data/sale_contract_data.xml',
        'views/account_analytic_analysis.xml',
        'report/sale_contract_report_view.xml',
    ],
    'demo': [],
    'installable': True,
    'auto_install': False,
    'application': True,
}